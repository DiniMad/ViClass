using ViClass.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace ViClass.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Class> Classes { get; set; }
        public DbSet<Survey> Surveys { get; set; }
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ClassStudent>()
                   .HasKey(cs => new { cs.ClassId, cs.StudentId });
            builder.Entity<Class>()
                   .HasOne(c => c.WeekTimeSchedule)
                   .WithOne(w => w.Class)
                   .HasForeignKey<Class>();
            base.OnModelCreating(builder);
        }
    }
}
