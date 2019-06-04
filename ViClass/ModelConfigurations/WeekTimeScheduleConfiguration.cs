using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ViClass.Models;

namespace ViClass.ModelConfigurations
{
    public class WeekTimeScheduleConfiguration : IEntityTypeConfiguration<WeekTimeSchedule>
    {
        public void Configure(EntityTypeBuilder<WeekTimeSchedule> builder)
        {
            builder.Property(w => w.SaturdayStartTimeFormatted).HasMaxLength(5);
            builder.Property(w => w.SaturdayLengthTime).HasMaxLength(5);
            builder.Property(w => w.SundayStartTimeFormatted).HasMaxLength(5);
            builder.Property(w => w.SundayLengthTime).HasMaxLength(5);
            builder.Property(w => w.MondayStartTimeFormatted).HasMaxLength(5);
            builder.Property(w => w.MondayLengthTime).HasMaxLength(5);
            builder.Property(w => w.TuesdayStartTimeFormatted).HasMaxLength(5);
            builder.Property(w => w.TuesdayLengthTime).HasMaxLength(5);
            builder.Property(w => w.WednesdayStartTimeFormatted).HasMaxLength(5);
            builder.Property(w => w.WednesdayLengthTime).HasMaxLength(5);
            builder.Property(w => w.ThursdayStartTimeFormatted).HasMaxLength(5);
            builder.Property(w => w.ThursdayLengthTime).HasMaxLength(5);
            builder.Property(w => w.FridayStartTimeFormatted).HasMaxLength(5);
            builder.Property(w => w.FridayLengthTime).HasMaxLength(5);
        }
    }
}