using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViClass.Controllers.Resources;
using ViClass.Data;
using ViClass.Models;

namespace ViClass.Controllers
{
    [Route("api/[controller]")]
    public class ClassController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ClassController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("[action]")]
        public IEnumerable<ClassResource> Classes()
        {
            var classes= _context.Classes
                           .Include(c=>c.Instructor)
                           .Include(c=>c.DayOfWeekSchedules)
                           .Include(c=>c.Videos)
                           .ToList();
            return _mapper.Map<List<Class>, List<ClassResource>>(classes);
        }
    }
}