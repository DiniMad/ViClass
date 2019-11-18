using System;
using System.Globalization;

namespace ViClass.Utility
{
    public static class PersianDate
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

        public static bool IsDateGreaterThan(this string firstDate, string secondDate)
        {
            int firstYear, firstMonth, firstDay, secondYear, secondMonth, secondDay;

            try
            {
                firstYear   = int.Parse(firstDate.Split('/')[0]);
                firstMonth  = int.Parse(firstDate.Split('/')[1]);
                firstDay    = int.Parse(firstDate.Split('/')[2]);
                secondYear  = int.Parse(secondDate.Split('/')[0]);
                secondMonth = int.Parse(secondDate.Split('/')[1]);
                secondDay   = int.Parse(secondDate.Split('/')[2]);
            }
            catch
            {
                throw new ArgumentException("The parameter is not a valid persian date.");
            }

            if (firstYear  != secondYear) return firstYear   > secondYear;
            if (firstMonth != secondMonth) return firstMonth > secondMonth;
            if (firstDay   != secondDay) return firstDay     > secondDay;
            // Same year, month and day so two dates are exactly same and first date is not greater than second
            return false;
        }

        public static string GetTomorrow()
        {
            var persianCalender = new PersianCalendar();
            var tomorrow        = DateTime.Now.AddDays(1);
            var year            = persianCalender.GetYear(tomorrow);
            var month           = persianCalender.GetMonth(tomorrow);
            var day             = persianCalender.GetDayOfMonth(tomorrow);
            return $"{year}/{month}/{day}";
        }
    }
}