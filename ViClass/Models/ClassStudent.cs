namespace ViClass.Models
{
    public class ClassStudent
    {
        public string StudentId { get; set; }
        public int ClassId { get; set; }
        public ApplicationUser Student { get; set; }
        public Class Class { get; set; }
    }
}