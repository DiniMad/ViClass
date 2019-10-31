using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ViClass.Models;

namespace ViClass.ModelConfigurations
{
    public class DayOfWeekScheduleConfiguration:IEntityTypeConfiguration<DayOfWeekSchedule>
    {
        public void Configure(EntityTypeBuilder<DayOfWeekSchedule> builder)
        {

            builder.Property(w => w.StartTimeFormatted)
                   .IsRequired();
            builder.Property(w => w.EndTimeFormatted)
                   .IsRequired();
        }
    }
}