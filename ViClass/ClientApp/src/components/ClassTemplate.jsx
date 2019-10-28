import React from "react";
import { summarizeText } from "./Services/StringService";

const hslColorConf = "30%, 72%";

//  const hslColorDark='100%, 15%'

function ClassTemplate(props) {
    const firstRandomNumber = Math.floor(Math.random() * 358);
    const secondRandomNumber = Math.floor(Math.random() * 358);
    const renderClassDate = (daysOfWeek, classStartDate) => {
        if (daysOfWeek.length !== 0) {
            if (daysOfWeek.length === 7)
                return (
                    <ul>
                        <li>هر روز</li>
                    </ul>
                );
            // noinspection JSUnresolvedVariable
            return (
                <ul className={daysOfWeek.length <= 4 && "low-capacity"}>
                    {daysOfWeek.map(dof => (
                        <li key={dof.id}>{DaysOfWeekConverter(dof.dayOfWeek)}</li>
                    ))}
                </ul>
            );
        }
        return (
            <ul>
                <li className="green">{classStartDate}</li>
            </ul>
        );
    };
    const DaysOfWeekConverter = dayNumber => {
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

    // noinspection JSUnresolvedVariable
    return (
        <div
            className="class-template"
            style={{
                backgroundColor: `hsl(${firstRandomNumber}, ${hslColorConf})`,
                backgroundImage: `linear-gradient(to bottom right,hsl(${firstRandomNumber}, ${hslColorConf}),hsl(${secondRandomNumber}, ${hslColorConf})`
            }}
        >
            <h3>{summarizeText(props.title, 30)}</h3>
            <p>{summarizeText(props.description, 180)}</p>
            <a href={`/api/user/${props.instructor.id}`}>{summarizeText(props.instructor.userName, 30)}</a>
            {renderClassDate(props.dayOfWeekSchedules, props.startDateFormatted)}
        </div>
    );
}

export default ClassTemplate;
