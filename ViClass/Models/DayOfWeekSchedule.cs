
namespace ViClass.Models
{
    public class DayOfWeekSchedule
    {
        public int Id { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public string StartTimeFormatted { get; set; }
        public string EndTimeFormatted { get; set; }
        public int ClassId { get; set; }
        public Class Class { get; set; }
    }
}