using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ViClass.Models;

namespace ViClass.ModelConfigurations
{
    public class SharedFileConfiguration:IEntityTypeConfiguration<SharedFile>
    {
        public void Configure(EntityTypeBuilder<SharedFile> builder)
        {
            builder.Property(v => v.Description)
                   .IsRequired();
            builder.Property(v => v.Path)
                   .IsRequired();
        }
    }
}