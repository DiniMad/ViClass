using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ViClass.Controllers.Resources;
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
        private const    int                  Kb                   = 1000;
        private const    long                 MaxImageAllowedSized = 300 * Kb;

        public FileController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context     = context;
            _environment = environment;
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> ProfileImage(IFormFile file)
            // Every response returns a unique guid so every response is unique
        {
            var userId = HttpContext.User.Claims.First(c => c.Type == "sub").Value;

            var newGuid = Guid.NewGuid();

            if (file is null) return BadRequest($"The file is null. {newGuid}");

            var fileExtension = Path.GetExtension(file.FileName);

            // Validate image
            if (file.Length <= 0) return BadRequest($"Size of the file is zero. {newGuid}");
            if (file.Length > MaxImageAllowedSized)
                return BadRequest($"Size of the file is bigger than allowed size. {newGuid}");
            if (!await file.IsSquareImage() || string.IsNullOrWhiteSpace(fileExtension))
                return StatusCode(415, $"The file is not either an image or square. {newGuid}");

            // Store the image in hard disk
            var             imageFolderPath = $"{_environment.WebRootPath}\\Profile Images\\";
            var             filePath        = $"{imageFolderPath}{newGuid}{fileExtension}";
            await using var stream          = System.IO.File.Create(filePath);
            await file.CopyToAsync(stream);

            // Assign the new image to the user
            var user                = await _context.Users.FindAsync(userId);
            var userPreviousImageId = user.ImageId;
            user.ImageId = newGuid.ToString();
            await _context.SaveChangesAsync();

            // Delete the previous image belongs to user from hard disk
            if (!string.IsNullOrWhiteSpace(userPreviousImageId))
            {
                var previousImagePath = Directory.GetFiles(imageFolderPath, $"{userPreviousImageId}.*");
                if (previousImagePath.Length == 1) System.IO.File.Delete(previousImagePath[0]);
            }

            return Ok(newGuid);
        }

        [HttpGet("[action]/{id}")]
        public async Task<ActionResult<ImageResource>> ProfileImage(string id)
        {
            var imageFolderPath = $"{_environment.WebRootPath}\\Profile Images\\";

            var imagePath = Directory.GetFiles(imageFolderPath, $"{id}.*");
            if (imagePath.Length != 1) return NotFound("Image not found.");

            var imageFileName = Path.GetFileName(imagePath[0]);
            var image         = await System.IO.File.ReadAllBytesAsync(imageFolderPath + imageFileName);
            var imageBase64   = Convert.ToBase64String(image);

            var imageExtensionWithoutPeriod = Path.GetExtension(imageFileName).Remove(0, 1);

            return new ImageResource {Data = imageBase64, Extension = imageExtensionWithoutPeriod};
        }
    }
}