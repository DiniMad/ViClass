import React, {useContext} from 'react';
import Http from "./HttpService";
import CurrentDateContext from "../Context/CurrentDateContext";
import Config from "../../config";

const currentDateApi = Config.ApiEndpoints.CurrentDate;

function DateService() {
    const currentDateCallResponse = Http.get(currentDateApi).catch(error => console.log(error));

    const currentDateObject = useContext(CurrentDateContext); // Stored current date

    const [currentDate, setCurrentData] = currentDateObject || [null, null];

    const currentDateFormatted: string = currentDate
                                         ? currentDate.split(",")[0]
                                         : null;
    const currentDayNumberOfWeek = currentDate
                                   ? currentDate.split(",")[1]
                                   : null;

    const initiateDateService = async (): boolean => {
        console.log(currentDate);
        if (currentDate)
            return true;
        currentDateCallResponse.then(response => {
            setCurrentData(response.data);
            return true;
        });
    };
    const getTomorrow = () => {
        const todayArray = currentDateFormatted.split("/");
        const tomorrowDayOfMonth = parseInt(todayArray[2]) + 1;
        return `${todayArray[0]}/${todayArray[1]}/${tomorrowDayOfMonth}`;
    };
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
        return isFirstPersianDateGreaterThanSecond(currentDateFormatted, dateToCheck);
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
    const isFirstPersianDateGreaterThanSecond = (firstDate, secondDate): boolean => {
        let firstYear, firstMonth, firstDay, secondYear, secondMonth, secondDay;
        try {
            // Destructuring properties from dates
            firstYear = parseInt(firstDate.split("/")[0]);
            firstMonth = parseInt(firstDate.split("/")[1]);
            firstDay = parseInt(firstDate.split("/")[2]);
            secondYear = parseInt(secondDate.split("/")[0]);
            secondMonth = parseInt(secondDate.split("/")[1]);
            secondDay = parseInt(secondDate.split("/")[2]);
        } catch {
            throw "Parameter is not in a valid persian date format.";
        }

        // If years not same
        if (firstYear !== secondYear) return firstYear > secondYear;
        // If months not same
        if (firstMonth !== secondMonth) return firstMonth > secondMonth;
        // If days not same
        if (firstDay !== secondDay) return firstDay > secondDay;
        // If it is same year same month and same day(means its today) then its not past
        return false;
    };

    return {
        currentDate,
        initiateDateService,
        getTomorrow,
        daysOfWeekConverter,
        isPastAsPersianDate,
        isCurrentDayOfWeek,
        whenIsNextClassDate,
        isFirstPersianDateGreaterThanSecond
    }
}

export default DateService;
const getDateAndDayNumberOfWeek = date => {

};

