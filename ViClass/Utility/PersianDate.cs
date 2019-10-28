using System;
using System.Globalization;

namespace ViClass.Utility
{
    public class PersianDate
    {
        public static string GetPersianDateFormatted(bool withDayOfWeekNumber = false)
        {
            var persianCalender = new PersianCalendar();
            var year            = persianCalender.GetYear(DateTime.Now);
            var month           = persianCalender.GetMonth(DateTime.Now);
            var day             = persianCalender.GetDayOfMonth(DateTime.Now);
            if (!withDayOfWeekNumber) return $"{year}/{month}/{day}";
            var dayOfWeek       = persianCalender.GetDayOfWeek(DateTime.Now);
            var dayOfWeekNumber = dayOfWeek.GetDayNumberInWeekStartsOnSaturday();
            return $"{year}/{month}/{day},{dayOfWeekNumber}";
        }
    }
}