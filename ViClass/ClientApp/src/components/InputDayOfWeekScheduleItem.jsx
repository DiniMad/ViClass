import React, {useState, useEffect, useRef} from 'react';
import InputTime from "./InputTime";

function InputDayOfWeekScheduleItem({title, dayNumberOfWeek, setSchedule}) {

    const [selected, setSelected] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const item = useRef(null);

    useEffect(() => {
        if (!selected) setSchedule(null);
        else
            setSchedule({
                            dayOfWeek: dayNumberOfWeek,
                            startTimeFormatted: startTime,
                            endTimeFormatted: endTime
                        })
    }, [startTime, endTime, selected]); // Set start and end time if item selected 

    const handleButtonClick = e => {
        e.preventDefault();
        if (!item) return;
        if (e.target.id !== "item" && e.target.id !== "title") return;
        if (selected) {
            item.current.classList.remove('selected');
            setSelected(false);
        }
        else {
            item.current.classList.add('selected');
            setSelected(true);
        }
    };

    return (
        <div ref={item} id="item" className="item" onClick={handleButtonClick}>
            <p id="title" className="title unselectable" onClick={handleButtonClick}>{title}</p>
            <div className="inputs">
                <InputTime setTime={setStartTime}/>
                <p id="to">تا</p>
                <InputTime setTime={setEndTime}/>
            </div>
        </div>
    );
}

export default InputDayOfWeekScheduleItem;