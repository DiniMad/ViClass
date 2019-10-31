import React, { useContext } from "react";
import { summarizeText } from "./Services/StringService";
import CurrentDateContext from "./Context/CurrentDateContext";
import { Link } from "react-router-dom";
import { daysOfWeekConverter, isPastAsPersianDate } from "./Services/DateService";

const hslColorConf = "30%, 72%";

//  const hslColorDark='100%, 15%'

function ClassTemplate({ classObject }) {
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
    const currentDate = useContext(CurrentDateContext);
    const currentDateFormatted = currentDate ? currentDate.split(",")[0] : null;
    const currentDayNumberOfWeek = currentDate ? currentDate.split(",")[1] : null;

    const renderClassDateBadge = () => {
        // If the class has not started yet
        if (!isPastAsPersianDate(startDateFormatted, currentDateFormatted))
            return (
                <ul>
                    <li className="green">{startDateFormatted}</li>
                </ul>
            );
        // If the class has been ended
        if (isPastAsPersianDate(endDateFormatted, currentDateFormatted))
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
            <ul className={dayOfWeekSchedules.length <= 4 ? "low-capacity" : null}>
                {dayOfWeekSchedules.map(({ id, dayOfWeek }, k) => (
                    <li key={k} className={dayOfWeek === currentDayNumberOfWeek ? "blue-primary" : null}>
                        {daysOfWeekConverter(dayOfWeek)}
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
            <Link to={`/class/${id}`} className="class-template-title">
                <h3>{summarizeText(title, 26)}</h3>
            </Link>
            <p className="class-template-description">{summarizeText(description, 180, 35)}</p>
            <Link to={`/user/${instructor.id}`} className="class-template-instructor">
                {summarizeText(instructor.userName, 30)}
            </Link>
            {currentDateFormatted && currentDayNumberOfWeek && renderClassDateBadge()}
        </div>
    );
}

export default ClassTemplate;
