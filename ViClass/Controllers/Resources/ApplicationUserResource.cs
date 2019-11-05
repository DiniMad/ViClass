namespace ViClass.Controllers.Resources
{
    public class ApplicationUserResource
    {
        public string Id { get; set; }
        public string NameAndFamily { get; set; }
        public string StudentNumber { get; set; }
        public bool StudentNumberConfirmed { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public string ImageId { get; set; }
    }
}