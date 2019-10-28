using System;

namespace ViClass.Utility
{
    public static class DayOfWeekExtensions
    {
        public static int GetDayNumberInWeekStartsOnSaturday(this DayOfWeek dayOfWeek)
        {
            var dayNumber        = (int) dayOfWeek;
            var correctDayNumber = (dayNumber + 1) % 7 + 1;
            return correctDayNumber;
        }
    }
}