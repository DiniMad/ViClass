namespace ViClass.Models.UploadVideo.Models
{
    public class UploadCompletedModel
    {
        public int    ClassId   { get; set; }
        public string SessionId { get; set; }
        public string FileName  { get; set; }
        public string TotalSize { get; set; }
    }
}