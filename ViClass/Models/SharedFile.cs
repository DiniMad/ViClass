namespace ViClass.Models
{
    public class SharedFile
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string SavedName { get; set; }
        public string VolumeInMg { get; set; }
        public int   ClassId { get; set; }
        public Class Class   { get; set; }
    }
}