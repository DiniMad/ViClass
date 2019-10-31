export const daysOfWeekConverter = dayNumber => {
    switch (dayNumber) {
        case 1:
            return "شنبه";
        case 2:
            return "یک شنبه";
        case 3:
            return "دو شنبه";
        case 4:
            return "سه شنبه";
        case 5:
            return "چهار شنبه";
        case 6:
            return "پنج شنبه";
        case 7:
            return "جمعه";
        default:
            console.log("Exception Happened.");
            break;
    }
};
export const isPastAsPersianDate = (dateToCheck, currentDate) => {
    let dateYear, dateMonth, dateDay, nowYear, nowMonth, nowDay;
    try {
        // Destructuring properties from dates
        dateYear = parseInt(dateToCheck.split("/")[0]);
        dateMonth = parseInt(dateToCheck.split("/")[1]);
        dateDay = parseInt(dateToCheck.split("/")[2]);
        nowYear = parseInt(currentDate.split("/")[0]);
        nowMonth = parseInt(currentDate.split("/")[1]);
        nowDay = parseInt(currentDate.split("/")[2]);
    } catch {
        throw "Parameter is not in a valid persian date format.";
    }

    // If years not same
    if (dateYear !== nowYear) return nowYear > dateYear;
    // If months not same
    if (dateMonth !== nowMonth) return nowMonth > dateMonth;
    // If days not same
    if (dateDay !== nowDay) return nowDay > dateDay;
    // If it is same year same month and same day(means its today) then its not past
    return false;
};
