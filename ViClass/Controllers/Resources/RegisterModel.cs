using System.ComponentModel.DataAnnotations;

namespace ViClass.Controllers.Resources
{
    public class RegisterModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(maximumLength: 10, MinimumLength = 10)]
        [Range(minimum: 9000000000, maximum: 9999999999)]
        public string StudentNumber { get; set; }

        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}