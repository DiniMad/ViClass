import React, {useEffect} from 'react';
import {normalizeNumberToFixLength} from "./Services/StringService";
import useInput from "./Hooks/useInput";

function InputTime({setTime}) {
    const [textHour, handleTextHourChange] = useInput("Hour", 2);
    const [textMinute, handleTextMinuteChange] = useInput("Minute", 2);

    useEffect(() => {
        const hour = normalizeNumberToFixLength(textHour, 2);
        const minute = normalizeNumberToFixLength(textMinute, 2);

        setTime(`${hour}:${minute}`)
    }, [textHour, textMinute]); // Set time on hour or minute changes

    return (
        <div className="input-time">
            <input type="text" id="hour" value={textHour} onChange={handleTextHourChange} placeholder="00"/>
            <p>:</p>
            <input type="text" id="minute" value={textMinute} onChange={handleTextMinuteChange} placeholder="00"/>
            <div className="bar">{}</div>
        </div>
    );
}

export default InputTime;