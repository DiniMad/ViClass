import React, {useState, useEffect, useContext} from 'react';
import useGetData from "../Hooks/useGetData";
import Config from "../../config";
import CurrentDateContext from "../Context/CurrentDateContext";

const currentDateApi = Config.ApiEndpoints.CurrentDate;

function DateService() {
    const [dateServiceInitiated, setDateServiceInitiated] = useState(false);

    const [currentDate, setCurrentData] = useContext(CurrentDateContext); // Stored current date

    const [date, dateResponseStatus] = useGetData(currentDateApi, !currentDate);

    useEffect(() => {
        if (currentDate)                            // stored date existed
            setDateServiceInitiated(true);
        else if (dateResponseStatus === 200) {      // date fetched
            setDateServiceInitiated(true);
            setCurrentData(date);
        }
        else                                        // date nether existed or has been fetched
            setDateServiceInitiated(false);
    }, [date, dateResponseStatus]); // Set dateServiceInitiated

    const currentDateFormatted = currentDate
                                 ? currentDate.split(",")[0]
                                 : null;
    const currentDayNumberOfWeek = currentDate
                                   ? currentDate.split(",")[1]
                                   : null;

    const daysOfWeekConverter = dayNumber => {
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
    const isPastAsPersianDate = (dateToCheck) => {
        let dateYear, dateMonth, dateDay, nowYear, nowMonth, nowDay;
        try {
            // Destructuring properties from dates
            dateYear = parseInt(dateToCheck.split("/")[0]);
            dateMonth = parseInt(dateToCheck.split("/")[1]);
            dateDay = parseInt(dateToCheck.split("/")[2]);
            nowYear = parseInt(currentDateFormatted.split("/")[0]);
            nowMonth = parseInt(currentDateFormatted.split("/")[1]);
            nowDay = parseInt(currentDateFormatted.split("/")[2]);
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
    const isCurrentDayOfWeek = dayNumberOfWeek => dayNumberOfWeek === currentDayNumberOfWeek;
    const isTodayAsPersianDate = (dateToCheck) => {
        let dateYear, dateMonth, dateDay, nowYear, nowMonth, nowDay;
        try {
            // Destructuring properties from dates
            dateYear = parseInt(dateToCheck.split("/")[0]);
            dateMonth = parseInt(dateToCheck.split("/")[1]);
            dateDay = parseInt(dateToCheck.split("/")[2]);
            nowYear = parseInt(currentDateFormatted.split("/")[0]);
            nowMonth = parseInt(currentDateFormatted.split("/")[1]);
            nowDay = parseInt(currentDateFormatted.split("/")[2]);
        } catch {
            throw "Parameter is not in a valid persian date format.";
        }

        return dateYear === nowYear && dateMonth === nowMonth && dateDay === nowDay;
    };
    const whenIsNextClassDate = (startDateFormatted, endDateFormatted, dayOfWeekSchedules) => {
        // It is future
        if (!isPastAsPersianDate(startDateFormatted)) {
            if (!isTodayAsPersianDate(startDateFormatted)) return ["future", startDateFormatted];
        }
        // It is past
        else if (isPastAsPersianDate(endDateFormatted)) return ["past", endDateFormatted];
        // It has been started and not finished yet
        let daysIntervalUntilNextClassDate = 6;
        // Find days interval until next class date
        for (let i = 0; i < dayOfWeekSchedules.length; i++) {
            const day = dayOfWeekSchedules[i];
            const interval = currentDayNumberOfWeek - day.dayOfWeek;
            if (interval === 0)         // Interval is zero means next class date is today
                daysIntervalUntilNextClassDate = interval;
            else if (interval < 0)      // Interval is negative means next class is in this week
                daysIntervalUntilNextClassDate = Math.abs(interval);
            else                        // Interval is positive means next class is in next week
                daysIntervalUntilNextClassDate = 7 - interval;
        }
        if (daysIntervalUntilNextClassDate === 0)
            return ["today", "امروز"];
        else if (daysIntervalUntilNextClassDate === 1)
            return ["future", "فردا"];
        return ["future", `${daysIntervalUntilNextClassDate} روز بعد`];
    };

    return {dateServiceInitiated, daysOfWeekConverter, isPastAsPersianDate, isCurrentDayOfWeek, whenIsNextClassDate}
}

export default DateService;


