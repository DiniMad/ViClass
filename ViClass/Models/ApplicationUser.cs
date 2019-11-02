using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViClass.Data;

namespace ViClass.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string NameAndFamily { get; set; }
        public string StudentNumber { get; set; }
        public bool StudentNumberConfirmed { get; set; }
        public ICollection<Class> ClassesAsInstructor { get; set; }
        public ICollection<ClassStudent> ClassesAsStudent { get; set; }
        public ICollection<Survey> SurveysCreated { get; set; }
        public string ImagePath { get; set; }
    }
}
