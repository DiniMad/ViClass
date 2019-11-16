import React from 'react';
import DateService from "./Services/DateService";

function DayOfWeek({dayOfWeekSchedules}) {
    const {dateServiceInitiated, daysOfWeekConverter} = DateService();
    // Destructuring properties from dayOfWeekSchedules
    const {dayOfWeek, startTimeFormatted, endTimeFormatted} = dayOfWeekSchedules;

    return (
        <div className="class-date-days-template">
            <p>{dateServiceInitiated && daysOfWeekConverter(dayOfWeek)}</p>
            <p>{startTimeFormatted}</p>
            <p>{endTimeFormatted}</p>
        </div>
    );
}

export default DayOfWeek;