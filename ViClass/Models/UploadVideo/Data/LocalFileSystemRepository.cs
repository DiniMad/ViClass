using System.IO;

namespace ViClass.Models.UploadVideo.Data
{
    public class LocalFileSystemRepository : FileRepository
    {
        // string ROOT = "./files_store";
        string ROOT = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Class Videos");

        public async override void Persist(string id, int chunkNumber, byte[] buffer)
        {
            string chunkDestinationPath = Path.Combine(ROOT, id);

            if (!Directory.Exists(chunkDestinationPath))
            {
                Directory.CreateDirectory(chunkDestinationPath);
            }

            string path = Path.Combine(ROOT, id, chunkNumber.ToString());
            await File.WriteAllBytesAsync(path, buffer);
        }

        protected override byte[] Read(string id, int chunkNumber)
        {
            string targetPath = Path.Combine(ROOT, id, chunkNumber.ToString());
            return File.ReadAllBytes(targetPath);
        }
    }
}