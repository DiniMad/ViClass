import React from 'react';
import DayOfWeek from "./DayOfWeek";

function ClassDate({startDate,endDate,dayOfWeeks}) {
    return (
        <div className="class-date">
            <div className="class-date-start-end">
                <p>
                    شروع: <mark>{startDate}</mark>
                </p>
                <p>
                    پایان: <mark>{endDate}</mark>
                </p>
            </div>
            <div className="class-date-days">
                {dayOfWeeks.map(day => (
                    <DayOfWeek key={day.id} dayOfWeekSchedules={day} />
                ))}
            </div>
        </div>
    );
}

export default ClassDate;