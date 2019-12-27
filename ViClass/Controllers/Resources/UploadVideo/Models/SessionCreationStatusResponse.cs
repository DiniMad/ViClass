using System;
using ViClass.Controllers.Resources.UploadVideo.Data;

namespace ViClass.Controllers.Resources.UploadVideo.Models
{
    /// <summary>
    /// Status of a session creation
    /// </summary>
    [Serializable]
    public class SessionCreationStatusResponse
    {
        public SessionCreationStatusResponse() { }
        public static SessionCreationStatusResponse fromSession(Session session)
        {
            return new SessionCreationStatusResponse
            {

                SessionId = session.Id,
                UserId = session.User,
                FileName = session.FileInfo.FileName
            };
        }

        /// <summary>
        /// File name
        /// </summary>
        public String FileName { get; set; }

        /// <summary>
        /// Session id
        /// </summary>
        public String SessionId { get; set; }

        /// <summary>
        /// User id
        /// </summary>
        public string UserId { get; set; }
    }
}