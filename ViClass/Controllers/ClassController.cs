using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using ViClass.Controllers.Resources;
using ViClass.Data;
using ViClass.Mapping;
using ViClass.Models;

namespace ViClass.Controllers
{
    [Authorize(AuthenticationSchemes = "Identity.Application")]
    [Route("api/[controller]")]
    public class ClassController : Controller
    {
        private readonly ApplicationDbContext         _context;
        private readonly IMapper                      _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public ClassController(ApplicationDbContext context, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _context     = context;
            _mapper      = mapper;
            _userManager = userManager;
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
            var requestUser = await _userManager.GetUserAsync(HttpContext.User);

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
                                     .SingleAsync(u => u.Id == requestUser.Id);

            var studentClasses = user.ClassesAsStudent.Select(cs => cs.Class).ToList();

            return _mapper.Map<List<Class>, List<ClassResource>>(studentClasses);
        }
    }
}