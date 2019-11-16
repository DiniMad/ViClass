import React, {useEffect, useContext} from 'react';
import useInput from "./Hooks/useInput";
import CurrentDateContext from "./Context/CurrentDateContext";
import {normalizeNumberToFixLength} from "./Services/StringService";

function InputDate({title, setDate,width}) {
    const style = width
                  ? {width: width}
                  : null;
    
    const currentDate = useContext(CurrentDateContext);

    const {yearPlaceHolder, monthPlaceHolder, dayPlaceHolder} = getPlaceHolders(currentDate);

    const [yearText, handleYearTextChange] = useInput("Year", 4);
    const [monthText, handleMonthTextChange] = useInput("Month", 2);
    const [dayText, handleDayTextChange] = useInput("Day", 2);

    useEffect(() => {
        const year = normalizeNumberToFixLength(yearText, 4);
        const month = normalizeNumberToFixLength(monthText, 2);
        const day = normalizeNumberToFixLength(dayText, 2);

        setDate(`${year}/${month}/${day}`)
    }, [yearText, monthText, dayText]); // Set date

    return (
        <div className="input-date" style={style}>
            <label htmlFor={title}>{title}:</label>
            <input id={title}
                   className="year"
                   type="text"
                   name={title}
                   value={yearText}
                   onChange={handleYearTextChange}
                   placeholder={yearPlaceHolder}/>
            <p>/</p>
            <input type="text"
                   value={monthText}
                   onChange={handleMonthTextChange}
                   placeholder={monthPlaceHolder}/>
            <p>/</p>
            <input className="day"
                   type="text"
                   value={dayText}
                   onChange={handleDayTextChange}
                   placeholder={dayPlaceHolder}/>
            <div className="bar">{}</div>
        </div>
    );
}

export default InputDate;
const getPlaceHolders = currentDate => {
    const yearPlaceHolder = currentDate
                            ? normalizeNumberToFixLength(currentDate[0].split(",")[0].split("/")[0], 4)
                            : "0000";
    const monthPlaceHolder = currentDate
                             ? normalizeNumberToFixLength(currentDate[0].split(",")[0].split("/")[1], 2)
                             : "00";
    const dayPlaceHolder = currentDate
                           ? normalizeNumberToFixLength(currentDate[0].split(",")[0].split("/")[2], 2)
                           : "00";

    return {yearPlaceHolder, monthPlaceHolder, dayPlaceHolder}
};