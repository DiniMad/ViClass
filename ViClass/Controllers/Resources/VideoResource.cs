namespace ViClass.Controllers.Resources
{
    public class VideoResource
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string SavedName { get; set; }
        public uint VolumeInMg { get; set; }
        public string LengthFormatted { get; set; }
    }
}