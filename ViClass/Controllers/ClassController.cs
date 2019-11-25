using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using ViClass.Controllers.Resources;
using ViClass.Data;
using ViClass.Models;
using ViClass.Utility;

namespace ViClass.Controllers
{
    [Authorize(AuthenticationSchemes = "Identity.Application")]
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper              _mapper;

        public ClassController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper  = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<ClassResource>> AllClasses()
        {
            var classes = await _context.Classes
                                        .Include(c => c.Instructor)
                                        .Include(c => c.DayOfWeekSchedules)
                                        .Include(c => c.Videos)
                                        .ToListAsync();

            return _mapper.Map<List<Class>, List<ClassResource>>(classes);
        }

        [HttpGet("StudyOrTeaching")]
        public async Task<ActionResult<IEnumerable<ClassWithRelationResource>>> StudyOrTeachingClasses()
        {
            var userId = HttpContext.User.Claims.First(c => c.Type == "sub").Value;

            var classes = await _context.Classes
                                        .Include(c => c.Instructor)
                                        .Include(c => c.DayOfWeekSchedules)
                                        .Include(c => c.Students)
                                        .Where(c => c.InstructorId == userId ||
                                                    c.Students.Any(s => s.StudentId == userId))
                                        .ToListAsync();

            var classesWithRelation = _mapper.Map<List<Class>, List<ClassWithRelationResource>>(classes);
            classesWithRelation.ForEach(c =>
            {
                c.RelationWithUser = c.InstructorId == userId
                                         ? RelationWithUser.Instructor
                                         : RelationWithUser.Student;
            });

            return classesWithRelation;
        }

        [HttpGet("{classId}")]
        public async Task<ActionResult<ClassWithRelationResource>> GetClass(int classId)
        {
            var userId = HttpContext.User.Claims.First(c => c.Type == "sub").Value;

            var theClass = await _context.Classes
                                         .Include(c => c.Instructor)
                                         .Include(c => c.DayOfWeekSchedules)
                                         .Include(c => c.Videos)
                                         .Include(c => c.Students)
                                         .SingleOrDefaultAsync(c => c.Id == classId);

            if (theClass is null) return NotFound("The Class Not Found.");

            RelationWithUser relationWithUser;
            // If the user requested is the instructor of the class
            if (theClass.InstructorId == userId)
            {
                _context.Entry(theClass).Collection(s => s.Students).Query().Include(cs => cs.Student).Load();
                relationWithUser = RelationWithUser.Instructor;
            }
            // Otherwise check if the use is student or not
            else
            {
                // Query to check if the class (c => c.Id == theClass.Id)
                //     contains user requested in its students (c.Students.Any(s => s.StudentId == userId))
                var isStudent = await _context.Classes.AnyAsync(c => c.Id == theClass.Id &&
                                                                     c.Students.Any(s => s.StudentId == userId));
                relationWithUser = isStudent ? RelationWithUser.Student : RelationWithUser.None;
            }

            var classResource = _mapper.Map<Class, ClassWithRelationResource>(theClass);
            classResource.RelationWithUser = relationWithUser;

            return classResource;
        }

        [HttpPost]
        public async Task<ActionResult<ClassResource>> AddClass(ClassResource classResource)
        {
            var userId = HttpContext.User.Claims.First(c => c.Type == "sub").Value;

            // Validation classResource
            var error = classResource.IsValid();
            if (!string.IsNullOrWhiteSpace(error)) return BadRequest(error);

            // Convert to model class
            var classModel = _mapper.Map<ClassResource, Class>(classResource);
            classModel.InstructorId = userId;

            // Store in database
            await _context.Classes.AddAsync(classModel);
            await _context.SaveChangesAsync();

            // Build URL to created class
            var request = HttpContext.Request;
            var url     = $"{request.Scheme}://{Request.Host}{Request.Path}{classModel.Id}";

            return Created(url, Guid.NewGuid());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ActionOnClass(int id, ClassActionResource classAction)
        {
            var userId = HttpContext.User.Claims.First(c => c.Type == "sub").Value;

            switch (classAction.Action)
            {
                case ClassAction.Register:
                    var requestedClass = await _context.Classes.SingleOrDefaultAsync(c => c.Id == id);
                    if (requestedClass is null) return BadRequest("The class not found.");
                    if (requestedClass.Students.Count >= requestedClass.MaxStudentNumber)
                        return BadRequest("The class reaches its maximum capacity.");
                    await _context.ClassStudent.AddAsync(new ClassStudent {ClassId = id, StudentId = userId});
                    break;

                case ClassAction.Unregister:
                    var entityToRemove =
                        await _context.ClassStudent
                                      .SingleOrDefaultAsync(cs => cs.StudentId == userId && cs.ClassId == id);
                    if (entityToRemove is null) return BadRequest("The requested class with this student not found.");
                    _context.ClassStudent.Remove(entityToRemove);
                    break;

                case ClassAction.Remove:
                    var theClass = await _context.Classes.SingleOrDefaultAsync(c => c.Id == id);
                    if (theClass is null) return BadRequest("The class not found.");
                    if (theClass.InstructorId != userId)
                        return BadRequest("Only instructor of a class can remove the class.");
                    if (theClass.Students.Count > 0) return BadRequest("Only classes without students can be removed.");
                    _context.Classes.Remove(theClass);
                    break;
                default:
                    return BadRequest("Unexpected error happened.");
            }

            await _context.SaveChangesAsync();

            return Ok(Guid.NewGuid());
        }
    }
}