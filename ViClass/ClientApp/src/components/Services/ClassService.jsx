import {isFirstTimeGreaterThanSecond} from "./StringService";
import DateService from "./DateService";

function ClassService() {
    const {
        currentDate,
        initiateDateService,
        getTomorrow,
        daysOfWeekConverter,
        isFirstPersianDateGreaterThanSecond
    } = DateService();

    const validationDateDetails = async (startDate, endDate) => {
        if (!currentDate) await initiateDateService();

        if (!isFirstPersianDateGreaterThanSecond(startDate, currentDate))
            return `حداقل تاریخ شروع ${getTomorrow()} است.`;

        if (!isFirstPersianDateGreaterThanSecond(endDate, startDate))
            return "تاریخ شروع باید بعد از تاریخ پایان باشد."
    };
    const validateDayOfWeekSchedule = Schedule => {
        if (Schedule.length === 0) return "باید حداقل یک روز انتخاب شده باشد.";

        for (let i = 0; i < Schedule.length; i++) {
            const day = Schedule[i];
            if (!isFirstTimeGreaterThanSecond(day.endTimeFormatted, day.startTimeFormatted)) {
                const dayName = daysOfWeekConverter(day.dayOfWeek);
                return `برنامه زمانی ${dayName} قابل قبول نیست.`;
            }
        }
    };
    const validateStudentsNumber = (min, max) => {
        if (min <= 0) return "حداقل تعداد دانشجو باید از صفر بیشتر باشد.";
        if (min > max && !!max) return "تعداد حداکثر دانشجویان نمیتواند از تعداد حداقل کمتر باشد.";
    };

    return {validateStudentsNumber, validationDateDetails, validateDayOfWeekSchedule};
}

export default ClassService;


