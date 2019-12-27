using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using ViClass.Controllers.Resources.UploadVideo.Data;
using ViClass.Controllers.Resources.UploadVideo.Models;
using ViClass.Data;
using ViClass.Models;
using ViClass.Service;

namespace ViClass.Controllers
{
    /// <summary>
    /// File Management Controller
    /// </summary>
    /// <remarks>Manages upload sessions</remarks>
    [Route("api/file/video")]
    [Authorize(AuthenticationSchemes = "Identity.Application")]
    public class VideoController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment  _environment;

        private static readonly UploadService UploadService =
            new UploadService(new LocalFileSystemRepository());

        private readonly Stream       _targetOutputStream = null;
        private readonly HttpResponse _targetResponse     = null;

        public VideoController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context     = context;
            _environment = environment;
        }

        [HttpPost("create")]
        [Produces("application/json")]
        public ActionResult<SessionCreationStatusResponse> StartSession(CreateSessionParams sessionParams)
        {
            if(sessionParams.TotalSize>400*1024*1024) return BadRequest("Maximum File Size Is 400 Mb.");

            var userId = HttpContext.User.Claims.First(c => c.Type == "sub").Value;

            Session session = UploadService.CreateSession(userId,
                                                          sessionParams.FileName,
                                                          sessionParams.TotalSize);

            return SessionCreationStatusResponse.fromSession(session);
        }

        [HttpPost("completed")]
        public async Task<IActionResult> UploadCompleted(UploadCompletedModel completedModel)
        {
            var userId = HttpContext.User.Claims.First(c => c.Type == "sub").Value;

            var newGuid = Guid.NewGuid();


            var theClass = await _context.Classes.FindAsync(completedModel.ClassId);
            if (theClass is null) return ((ControllerBase) this).BadRequest($"The class not found. {newGuid}");
            if (theClass.InstructorId != userId)
                return ((ControllerBase) this).BadRequest($"Only the instructor can upload. {newGuid}");


            theClass.Videos.Add(new Video
            {
                SavedName   = completedModel.SessionId,
                Description = completedModel.FileName,
                VolumeInByte = completedModel.TotalSize
            });
            await _context.SaveChangesAsync();

            return Ok(newGuid);
        }

        [HttpPost("cancel")]
        public IActionResult CancelUpload(string sessionId)
        {
            var filePath = Path.Combine(_environment.WebRootPath, "Class Videos", sessionId);

            if (Directory.Exists(filePath))
                Directory.Delete(filePath, true);
            else
                return ((ControllerBase) this).BadRequest("File not found");

            return Ok(Guid.NewGuid());
        }

        [HttpPut("upload/user/{userId}/session/{sessionId}/")]
        [Produces("application/json")]
        [Consumes("multipart/form-data")]
        public JsonResult UploadFileChunk(string userId, string sessionId, int chunkNumber, IFormFile inputFile)
        {
            if (string.IsNullOrWhiteSpace(userId)) return BadRequest("User missing");

            if (string.IsNullOrWhiteSpace(sessionId)) return BadRequest("Session ID is missing");

            if (chunkNumber < 1) return BadRequest("Invalid chunk number");

            var file = inputFile ?? Request.Form.Files.First();

            UploadService.PersistBlock(sessionId, userId, chunkNumber, ToByteArray(file.OpenReadStream()));

            return Json("Ok");
        }


        [HttpGet("download/{sessionId}")]
        [Produces("multipart/form-data")]
        public void DownloadFile(string sessionId)
        {
            var videos = _context.Video.Where(v => v.SavedName == sessionId).ToList();

            if (videos.Count != 1) return;

            var video = videos[0];

            var response = _targetResponse ?? Response;

            response.ContentType                    = "application/octet-stream";
            response.ContentLength                  = long.Parse(video.VolumeInByte);
            response.Headers["Content-Disposition"] = "attachment; fileName=" + video.Description;

            var syncIoFeature = HttpContext.Features.Get<IHttpBodyControlFeature>();
            if (syncIoFeature != null)
            {
                syncIoFeature.AllowSynchronousIO = true;
            }

            UploadService.WriteToStream(_targetOutputStream ?? Response.Body,
                                        video.SavedName,
                                        long.Parse(video.VolumeInByte));
        }

        private static byte[] ToByteArray(Stream stream)
        {
            using var ms = new MemoryStream();
            stream.CopyTo(ms);
            return ms.ToArray();
        }

        private static JsonResult BadRequest(string message)
        {
            var result = new JsonResult("{'message': '" + message + "' }") {StatusCode = 400};
            return result;
        }
    }
}