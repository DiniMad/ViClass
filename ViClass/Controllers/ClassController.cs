using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViClass.Data;
using ViClass.Models;

namespace ViClass.Controllers
{
    [Route("api/[controller]")]
    public class ClassController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ClassController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<Class> Classes()
        {
            return _context.Classes
                           .Include(c=>c.Instructor)
                           .Include(c=>c.WeekTimeSchedule)
                           .Include(c=>c.Videos);
        }
    }
}