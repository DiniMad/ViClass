using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ViClass.Models;

namespace ViClass.ModelConfigurations
{
    public class SurveyConfiguration:IEntityTypeConfiguration<Survey>
    {
        public void Configure(EntityTypeBuilder<Survey> builder)
        {
            builder.Property(s => s.Title)
                   .IsRequired()
                   .HasMaxLength(255);
            builder.Property(s => s.Text)
                   .IsRequired();
        }
    }
}