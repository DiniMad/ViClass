using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using ViClass.Controllers.Resources;
using ViClass.Data;
using ViClass.Models;
using ViClass.Utility;

namespace ViClass.Controllers
{
    [Authorize(AuthenticationSchemes = "Identity.Application")]
    [Route("api/[controller]")]
    public class FileController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment  _environment;
        private const    double               Kb                         = 1024;
        private const    double               Mb                         = 1024 * Kb;
        private const    long                 MaxImageAllowedSized       = (long) (300 * Kb);
        private const    long                 MaxClassVideoAllowedSized  = (long) (300 * Mb);
        private const    long                 MaxSharedFilesAllowedSized = (long) (10  * Mb);

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

        [HttpPost("[action]")]
        public async Task<IActionResult> SharedFiles(int classId, IFormFile file)
        {
            var userId = HttpContext.User.Claims.First(c => c.Type == "sub").Value;

            if (file is null) return BadRequest(ApiResponseResource.Fail("The file is null."));

            var fileExtension = Path.GetExtension(file.FileName);

            // Validate file
            if (file.Length <= 0) return BadRequest(ApiResponseResource.Fail("Size of the file is zero."));
            if (file.Length > MaxSharedFilesAllowedSized)
                return BadRequest(ApiResponseResource.Fail("Size of the file is bigger than allowed size."));
            if (string.IsNullOrWhiteSpace(fileExtension) || fileExtension != ".rar" && fileExtension != ".zip")
                return StatusCode(415, ApiResponseResource.Fail("The file format is not valid.", 415));

            var theClass = await _context.Classes.FindAsync(classId);
            if (theClass is null) return BadRequest(ApiResponseResource.Fail("The class not found."));
            if (theClass.InstructorId != userId)
                return BadRequest(ApiResponseResource.Fail("Only the instructor can upload."));


            // Store the file on hard disk
            var             sharedFilesFolderPath = $"{_environment.WebRootPath}\\Class Shared Files\\";
            var             fileName              = $"{Guid.NewGuid()}{fileExtension}";
            var             filePath              = $"{sharedFilesFolderPath}{fileName}";
            await using var stream                = System.IO.File.Create(filePath);
            await file.CopyToAsync(stream);

            // Add new file to the class shared files
            theClass.SharedFiles.Add(new SharedFile
            {
                SavedName   = fileName,
                Description = Path.GetFileNameWithoutExtension(file.FileName),
                VolumeInMg  = (file.Length / Mb).ToString("F")
            });
            await _context.SaveChangesAsync();

            return Ok(ApiResponseResource.Success("New shared file added."));
        }

        [HttpGet("[action]/{type}/{name}")]
        public async Task<IActionResult> DownloadFile(string type, string name)
        {
            if (string.IsNullOrEmpty(type) || string.IsNullOrEmpty(name))
                return BadRequest(ApiResponseResource.Fail("Type or name is invalid."));

            var path = Path.Combine(Directory.GetCurrentDirectory(),
                                    "wwwroot",
                                    type,
                                    name);

            var memory = new MemoryStream();
            try
            {
                await using var stream = new FileStream(path, FileMode.Open);
                await stream.CopyToAsync(memory);
            }
            catch
            {
                return BadRequest(ApiResponseResource.Fail("Type or name is invalid."));
            }

            memory.Position = 0;

            return File(memory, GetContentType(name), name);
        }

        private static string GetContentType(string fileName)
        {
            var ext = Path.GetExtension(fileName);
            return ext switch
            {
                ".rar" => "application/x-rar-compressed",
                ".zip" => "application/zip",
                _      => null
            };
        }
    }
}