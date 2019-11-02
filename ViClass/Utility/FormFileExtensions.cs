using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace ViClass.Utility
{
    public static class FormFileExtensions
    {
        public static async Task<bool> IsImage(this IFormFile file)
        {
            await using var fileMemoryStream = new MemoryStream();
            try
            {
                await file.CopyToAsync(fileMemoryStream);
                using (var possibleImage = Image.FromStream(fileMemoryStream))
                {
                }

                // At this point file converted to an Image object so it is an image.
                return true;
            }
            catch
            {
                // ignored
            }

            // Could not convert file to an Image object so it is not an image.
            return false;
        }
    }
}