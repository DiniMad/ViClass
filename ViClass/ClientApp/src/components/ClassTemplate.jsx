import React, { Component } from "react";

class ClassTemplate extends Component {
    state = {};
    render() {
        const firstRandomNumber = Math.floor(Math.random() * 358);
        const secendRandomNumber = Math.floor(Math.random() * 358);
        const hslColorConf = "30%, 72%";
        //  const hslColorDark='100%, 15%'
        return (
            <div
                className="class-template"
                style={{
                    backgroundColor: `hsl(${firstRandomNumber}, ${hslColorConf})`,
                    backgroundImage: `linear-gradient(to bottom right,hsl(${firstRandomNumber}, ${hslColorConf}),hsl(${secendRandomNumber}, ${hslColorConf})`
                }}
            >
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
                <a href={`/api/user/${this.props.instructor.id}`}>
                    {this.props.instructor.userName}
                </a>
                {this.renderClassDate(
                    this.props.dayOfWeekSchedules,
                    this.props.startDateFormatted
                )}
            </div>
        );
    }
    renderClassDate(daysOfWeek, classStartDate) {
        // daysOfWeek[2] = daysOfWeek[0];
        // daysOfWeek[3] = daysOfWeek[0];
        if (daysOfWeek.length !== 0) {
            if (daysOfWeek.length === 7)
                return (
                    <ul>
                        <li>هر روز</li>
                    </ul>
                );
            return (
                <ul className={daysOfWeek.length <= 4 && "low-capacity"}>
                    {daysOfWeek.map(dof => (
                        <li key={dof.id}>
                            {this.DaysOfWeekConvertor(dof.dayOfWeek)}
                        </li>
                    ))}
                </ul>
            );
        }
        return (
            <ul>
                <li className="green">{classStartDate}</li>
            </ul>
        );
    }

    DaysOfWeekConvertor(dayNumber) {
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
                console.log("Exeption Happened.");
                break;
        }
    }
}

export default ClassTemplate;
