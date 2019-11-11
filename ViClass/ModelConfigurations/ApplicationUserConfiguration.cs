using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ViClass.Models;

namespace ViClass.ModelConfigurations
{
    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.Property(au => au.StudentNumber).HasMaxLength(10);
            builder.HasIndex(au => au.StudentNumber).IsUnique();
            builder.Property(au => au.NameAndFamily).HasMaxLength(32);
            builder.HasIndex(au => au.ImageId).IsUnique();
            builder.HasIndex(au => au.Email).IsUnique();
        }
    }
}