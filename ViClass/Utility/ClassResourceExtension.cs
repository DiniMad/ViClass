using System.Linq;
using ViClass.Controllers.Resources;

namespace ViClass.Utility
{
    public static class ClassResourceExtension
    {
        public static string IsValid(this ClassResource classResource)
        {
            // startDate endDate Schedule title description minStudent maxStudent  

            // Tittle
            var titleLength = classResource.Title.Trim().Length;
            if (titleLength <= 0) return "تعداد کارکتر های عنوان باید از صفر بیشتر باشد.";
            if (titleLength > 64) return "تعداد کارکتر های عنوان باید از 64 کمتر باشد.";

            // Description
            var descriptionLength = classResource.Description.Trim().Length;
            if (descriptionLength <= 0) return "تعداد کارکتر های توضیحات باید از صفر بیشتر باشد.";
            if (descriptionLength > 512) return "تعداد کارکتر های توضیحات باید از 512 کمتر باشد.";

            // Student Number Details
            var min = classResource.MinStudentNumber;
            var max = classResource.MaxStudentNumber;
            if (min <= 0) return "تعداد حداقل دانشجویان باید از صفر بیشتر باشد.";
            if (max < min) return "تعداد حداکثر دانشجویان نمیتواند از تعداد حداقل کمتر باشد.";

            // Date Details
            var today     = PersianDate.GetPersianDateFormatted();
            var tomorrow  = PersianDate.GetTomorrow();
            var startDate = classResource.StartDateFormatted;
            var endDate   = classResource.EndDateFormatted;
            if (!startDate.IsDateGreaterThan(today)) return $"حداقل تاریخ شروع {tomorrow} است.";
            if (!endDate.IsDateGreaterThan(startDate)) return "تاریخ پایان باید بعد از تاریخ شروع باشد.";

            // Schedules
            var schedules = classResource.DayOfWeekSchedules.ToList();
            if (schedules.Count == 0) return "باید حداقل یک روز انتخاب شده باشد.";

            var hasDuplicateDayOfWeek = schedules.GroupBy(x => x.DayOfWeek).Any(sg => sg.Count() > 1);
            if (hasDuplicateDayOfWeek) return "برنامه هفتگی اشتباه است.";

            for (var i = 0; i < schedules.Count; i++)
            {
                var startTime = schedules[i].StartTimeFormatted;
                var endTime   = schedules[i].EndTimeFormatted;

                if (!endTime.IsTimeGreaterThan(startTime)) return "زمان پایان باید بعد از زمان شروع باشد.";
            }

            return null;
        }
    }
}