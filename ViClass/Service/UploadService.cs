using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using ViClass.Models.UploadVideo.Data;
using ViClass.Models.UploadVideo.Exception;

namespace ViClass.Service
{
    public class UploadService
    {
        private const int ChunkLimit = 1048576;

        private readonly Dictionary<string, Session> _sessions;
        private readonly FileRepository              _fileStorage;

        public UploadService(FileRepository storage)
        {
            _fileStorage = storage;
            _sessions    = new Dictionary<string, Session>();
        }

        public Session CreateSession(string user, string fileName, long fileSize)
        {
            if (string.IsNullOrWhiteSpace(fileName)) throw new BadRequestException("File name missing");


            if (fileSize < 1) throw new BadRequestException("Total size must be greater than zero");

            var session = new Session(user, new FileInformation(fileSize, fileName));
            _sessions.Add(session.Id, session);


            return session;
        }

        private Session GetSession(String id)
        {
            return _sessions[id];
        }

        public void PersistBlock(String sessionId, string userId, int chunkNumber, byte[] buffer)
        {
            var session = GetSession(sessionId);

            try
            {
                if (session == null)
                {
                    throw new NotFoundException("Session not found");
                }

                _fileStorage.Persist(sessionId, chunkNumber, buffer);


                session.FileInfo.MarkChunkAsPersisted(chunkNumber);
                session.RenewTimeout();
            }
            catch (Exception e)
            {
                session?.MaskAsFailed();

                throw e;
            }
        }

        public void WriteToStream(Stream stream, string sessionId, long fileSize)
        {
            var chunkNumber = (int) Math.Ceiling(fileSize / (ChunkLimit * 1F));
            _fileStorage.WriteToStream(stream, sessionId, chunkNumber);
        }
    }
}