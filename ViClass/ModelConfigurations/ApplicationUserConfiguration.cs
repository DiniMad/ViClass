using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ViClass.Models;

namespace ViClass.ModelConfigurations
{
    public class ApplicationUserConfiguration:IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {

            builder.Property(au => au.StudentNumber)
                   .HasMaxLength(10);
            builder.HasIndex(au => au.StudentNumber);
        }
    }
}