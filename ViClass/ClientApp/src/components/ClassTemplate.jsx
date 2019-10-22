import React from "react";

const hslColorConf = "30%, 72%";
//  const hslColorDark='100%, 15%'

function ClassTemplate(props) {
    
    const firstRandomNumber = Math.floor(Math.random() * 358);
    const secondRandomNumber = Math.floor(Math.random() * 358);

    const summarizeText = (text, length) => {
        // Check if every line has at least one white space (for Description field).
        if (text.length < length) {
            let indexOfWhiteSpaces = GetAllPositionsOfCharacter(text, " ");
            for (let i = 1; i < indexOfWhiteSpaces.length; i++) {
                const textBetweenSpaces = text.substring(
                    indexOfWhiteSpaces[i - 1],
                    indexOfWhiteSpaces[i]
                );
                if (textBetweenSpaces.length > 35) {
                    let preivusPartOfText = text.substring(
                        0,
                        indexOfWhiteSpaces[i - 1]
                    );
                    let cutedText = text.substring(
                        indexOfWhiteSpaces[i - 1],
                        indexOfWhiteSpaces[i]
                    );
                    let resultText = cutedText.substring(0, 33);
                    return preivusPartOfText + resultText + "...";
                }
            }
            return text;
        }
        let cutedText = text.substring(0, length - 3);
        let indexOfLastWhiteSpace = cutedText.lastIndexOf(" ");
        // If there is no white space
        if (indexOfLastWhiteSpace === -1)
            indexOfLastWhiteSpace = cutedText.length - 3;
        let cutedTextOnWhiteSpace = cutedText.substring(
            0,
            indexOfLastWhiteSpace
        );
        return cutedTextOnWhiteSpace + "...";
    };
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
                        <li key={dof.id}>
                            {DaysOfWeekConverter(dof.dayOfWeek)}
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
    };
    const DaysOfWeekConverter = (dayNumber) => {
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
    const GetAllPositionsOfCharacter = (text, character) => {
        let indexes = [0];

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === character) indexes[indexes.length] = i;
        }

        indexes[indexes.length] = text.length;
        return indexes;
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
            <a href={`/api/user/${props.instructor.id}`}>
                {summarizeText(props.instructor.userName, 30)}
            </a>
            {renderClassDate(
                props.dayOfWeekSchedules,
                props.startDateFormatted
            )}
        </div>
    );
}

export default ClassTemplate;
