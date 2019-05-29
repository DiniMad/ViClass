using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace ViClass.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            ClassAsStudent=new Collection<ClassStudent>();
        }
        public Class ClassAsInstructor{ get; set; }
        public ICollection<ClassStudent> ClassAsStudent { get; set; }
    }
}
