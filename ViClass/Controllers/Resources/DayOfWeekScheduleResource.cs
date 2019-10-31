using ViClass.Models;

namespace ViClass.Controllers.Resources
{
    public class DayOfWeekScheduleResource
    {
        public int Id { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public string StartTimeFormatted { get; set; }
        public string EndTimeFormatted { get; set; }
    }
}