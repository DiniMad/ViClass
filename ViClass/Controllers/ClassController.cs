﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using ViClass.Controllers.Resources;
using ViClass.Data;
using ViClass.Models;

namespace ViClass.Controllers
{
    [Authorize(AuthenticationSchemes = "Identity.Application")]
    [Route("api/[controller]")]
    public class ClassController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper              _mapper;

        public ClassController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper  = mapper;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<ClassResource>> Classes()
        {
            var classes = await _context.Classes
                                        .Include(c => c.Instructor)
                                        .Include(c => c.DayOfWeekSchedules)
                                        .Include(c => c.Videos)
                                        .ToListAsync();
            return _mapper.Map<List<Class>, List<ClassResource>>(classes);
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<ClassResource>> StudentClasses()
        {
            var userId = HttpContext.User.Claims.First(c => c.Type == "sub").Value;

            var user = await _context.Users
                                     .Include(u => u.ClassesAsStudent)
                                     .ThenInclude(cs => cs.Class)
                                     .ThenInclude(c => c.Instructor)
                                     .Include(u => u.ClassesAsStudent)
                                     .ThenInclude(cs => cs.Class)
                                     .ThenInclude(c => c.DayOfWeekSchedules)
                                     .Include(u => u.ClassesAsStudent)
                                     .ThenInclude(cs => cs.Class)
                                     .ThenInclude(c => c.Videos)
                                     .SingleAsync(u => u.Id == userId);

            var studentClasses = user.ClassesAsStudent.Select(cs => cs.Class).ToList();

            return _mapper.Map<List<Class>, List<ClassResource>>(studentClasses);
        }

        [HttpGet("{classId}")]
        public async Task<ActionResult<SingleClassResource>> GetClass(int classId)
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

            var classResource = _mapper.Map<Class, SingleClassResource>(theClass);
            classResource.RelationWithUser = relationWithUser;

            return classResource;
        }
    }
}