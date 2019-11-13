import React from 'react';
import DateService from "./Services/DateService";

function DayOfWeek({dayOfWeekSchedules}) {
    const {daysOfWeekConverter} = DateService();
    // Destructuring properties from dayOfWeekSchedules
    const {dayOfWeek, startTimeFormatted, endTimeFormatted} = dayOfWeekSchedules;

    return (
        <div className="class-date-days-template">
            <p>{daysOfWeekConverter(dayOfWeek)}</p>
            <p>{startTimeFormatted}</p>
            <p>{endTimeFormatted}</p>
        </div>
    );
}

export default DayOfWeek;