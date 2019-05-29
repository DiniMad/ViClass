namespace ViClass.Models
{
    public class Video
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Path { get; set; }
        public uint VolumeInMg { get; set; }
        public string LengthFormatted { get; set; }
        public int ClassId { get; set; }
        public Class Class { get; set; }
    }
}