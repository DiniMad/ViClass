namespace ViClass.Controllers.Resources
{
    public class SharedFileResource
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Path { get; set; }
        public ushort VolumeInMg { get; set; }
    }
}