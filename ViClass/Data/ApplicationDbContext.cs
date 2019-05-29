using ViClass.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ViClass.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Class>()
                   .HasOne(c => c.Instructor)
                   .WithOne(au => au.ClassAsInstructor)
                   .HasForeignKey<Class>(c => c.InstructorId);

            builder.Entity<ClassStudent>()
                   .HasKey(cs => new { cs.ClassId, cs.StudentId });

            builder.Entity<ClassStudent>()
                   .HasOne(cs => cs.Class)
                   .WithMany(c => c.Students)
                   .HasForeignKey(cs => cs.ClassId);

            builder.Entity<ClassStudent>()
                   .HasOne(cs => cs.Student)
                   .WithMany(au => au.ClassAsStudent)
                   .HasForeignKey(cs => cs.StudentId);

            builder.Entity<Class>()
                   .HasMany(c => c.Videos)
                   .WithOne(v => v.Class)
                   .HasForeignKey(v => v.ClassId);

            builder.Entity<Class>()
                   .HasMany(c => c.SharedFiles)
                   .WithOne(sf => sf.Class)
                   .HasForeignKey(sf => sf.ClassId);

            builder.Entity<Class>()
                   .HasOne(c => c.WeekTimeSchedule)
                   .WithOne(w => w.Class)
                   .HasForeignKey<Class>(c => c.WeekTimeScheduleId);

            base.OnModelCreating(builder);
        }
    }
}
