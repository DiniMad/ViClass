using System.IO;

namespace ViClass.Models.UploadVideo.Data
{
    public abstract class FileRepository
    {
        public abstract void Persist(string id, int chunkNumber, byte[] buffer);

        protected abstract byte[] Read(string id, int chunkNumber);

        public void WriteToStream(Stream stream,string sessionId,int chunkNumber)
        {
            using (var sw = new BinaryWriter(stream))
            {
                for (var i = 1; i <= chunkNumber; i++)
                {
                    sw.Write(Read(sessionId, i));
                }
            }

            stream.Flush();
        }
    }
}