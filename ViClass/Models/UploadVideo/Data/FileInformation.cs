using System;
using System.Collections.Generic;

namespace ViClass.Models.UploadVideo.Data
{
    public class FileInformation
    {
        public virtual ISet<int> AlreadyPersistedChunks { get; private set; } = new HashSet<int>();

        public long FileSize { get; set; }

        public string FileName { get; set; }

        public int ChunkSize => 1048576;

        public FileInformation(long fileSize, String fileName)
        {
            this.FileSize  = fileSize;
            this.FileName  = fileName;
        }

        public virtual int TotalNumberOfChunks
        {
            get { return (int) Math.Ceiling(FileSize / (ChunkSize * 1F)); }
        }

        public virtual void MarkChunkAsPersisted(int chunkNumber)
        {
            AlreadyPersistedChunks.Add(chunkNumber);
        }
    }
}