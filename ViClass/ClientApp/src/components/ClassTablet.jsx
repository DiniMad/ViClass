import React from "react";
import {summarizeText} from "./Services/StringService";
import {Link} from "react-router-dom";
import DateService from "./Services/DateService";

const hslColorConf = "30%, 72%";

//  const hslColorDark='100%, 15%'

function ClassTablet({classObject}) {
    const {dateServiceInitiated, daysOfWeekConverter, isPastAsPersianDate, isCurrentDayOfWeek} = DateService();
    // Destructuring class properties from classObject
    const {
        id,
        title,
        description,
        instructor,
        dayOfWeekSchedules,
        startDateFormatted,
        endDateFormatted
    } = classObject;
    // Generate two random number for building random color
    const firstRandomNumber = Math.floor(Math.random() * 358);
    const secondRandomNumber = Math.floor(Math.random() * 358);
    // Destructuring current date properties using useContext hook

    const renderClassDateBadge = () => {
        // If the class has not started yet
        if (dateServiceInitiated && !isPastAsPersianDate(startDateFormatted))
            return (
                <ul>
                    <li className="green">{startDateFormatted}</li>
                </ul>
            );
        // If the class has been ended
        if (dateServiceInitiated && isPastAsPersianDate(endDateFormatted))
            return (
                <ul>
                    <li className="red">{endDateFormatted}</li>
                </ul>
            );
        // The class has been started and has not ended yet
        if (dayOfWeekSchedules.length === 0) throw "dayOfWeekSchedules property is empty.";
        if (dayOfWeekSchedules.length === 7)
            return (
                <ul>
                    <li className="blue-primary">هر روز</li>
                </ul>
            );
        return (
            <ul className={dayOfWeekSchedules.length <= 4
                           ? "low-capacity"
                           : null}>
                {dayOfWeekSchedules.map(({id, dayOfWeek}, k) => (
                    <li key={k} className={dateServiceInitiated && isCurrentDayOfWeek(dayOfWeek)
                                           ? "blue-primary"
                                           : null}>
                        {dateServiceInitiated && daysOfWeekConverter(dayOfWeek)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div
            className="class-template"
            style={{
                backgroundColor: `hsl(${firstRandomNumber}, ${hslColorConf})`,
                backgroundImage: `linear-gradient(to bottom right,hsl(${firstRandomNumber}, ${hslColorConf}),hsl(${secondRandomNumber}, ${hslColorConf})`
            }}
        >
            <h3 className="class-template-title"><Link to={`/class/${id}`}>
                {summarizeText(title, 26)}
            </Link></h3>
            <p className="class-template-description">{summarizeText(description, 180, 35)}</p>
            <Link to={`/user/${instructor.id}`} className="class-template-instructor">
                {summarizeText(instructor.nameAndFamily, 30)}
            </Link>
            {renderClassDateBadge()}
        </div>
    );
}

export default ClassTablet;
