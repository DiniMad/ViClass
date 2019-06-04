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
using ViClass.ModelConfigurations;

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
            builder.ApplyConfiguration(new ClassConfiguration());
            builder.ApplyConfiguration(new VideoConfiguration());
            builder.ApplyConfiguration(new SharedFileConfiguration());
            builder.ApplyConfiguration(new WeekTimeScheduleConfiguration());
            builder.ApplyConfiguration(new SurveyConfiguration());
            builder.Entity<ClassStudent>().HasKey(cs => new { cs.ClassId, cs.StudentId });
            builder.Entity<SurveyItem>().Property(si => si.Text).IsRequired().HasMaxLength(255);

            base.OnModelCreating(builder);
        }
    }
}
