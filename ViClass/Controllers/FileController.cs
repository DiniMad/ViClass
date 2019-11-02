using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using ViClass.Data;
using ViClass.Utility;

namespace ViClass.Controllers
{
    [Authorize(AuthenticationSchemes = "Identity.Application")]
    [Route("api/[controller]")]
    public class FileController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment  _environment;
        private const    int                  Kb = 1000;

        public FileController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context     = context;
            _environment = environment;
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> ProfileImage(IFormFile file)
        {
            if (file is null) return BadRequest("The file is null.");
            
            const long allowedSized  = 1000 * Kb;
            var        fileExtension = Path.GetExtension(file.FileName);

            if (file.Length <= 0) return BadRequest("Size of the file is zero.");
            if (file.Length > allowedSized) return BadRequest("Size of the file is bigger than allowed size.");
            if (!await file.IsImage() || string.IsNullOrWhiteSpace(fileExtension))
                return StatusCode(415, "File is not a valid image.");

            var             filePath = $"{_environment.WebRootPath}\\Profile Images\\{Guid.NewGuid()}{fileExtension}";
            await using var stream   = System.IO.File.Create(filePath);
            await file.CopyToAsync(stream);

            return Ok(new {file.Length, filePath});
        }
    }
}