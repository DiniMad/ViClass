using System;

namespace ViClass.Utility
{
    public static class StringExtension
    {
        public static bool IsTimeGreaterThan(this string firstTime, string secondTime)
        {
            int firstHour, firstMinute, secondHour, secondMinute;

            try
            {
                firstHour    = int.Parse(firstTime.Split(":")[0]);
                firstMinute  = int.Parse(firstTime.Split(":")[1]);
                secondHour   = int.Parse(secondTime.Split(":")[0]);
                secondMinute = int.Parse(secondTime.Split(":")[1]);
            }
            catch
            {
                throw new ArgumentException("Time parameter is not a valid time.");
            }

            if (firstHour > secondHour) return true;
            return firstHour == secondHour && firstMinute > secondMinute;
        }
    }
}