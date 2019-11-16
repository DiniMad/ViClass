import React, {useState, useEffect} from 'react';
import InputDayOfWeekScheduleItem from "./InputDayOfWeekScheduleItem";


function InputDayOfWeekSchedule({setDayOfWeekSchedule}) {
    const [day1, setDay1] = useState(null);
    const [day2, setDay2] = useState(null);
    const [day3, setDay3] = useState(null);
    const [day4, setDay4] = useState(null);
    const [day5, setDay5] = useState(null);
    const [day6, setDay6] = useState(null);
    const [day7, setDay7] = useState(null);

    useEffect(() => {
        const dayOfWeekSchedule = [day1, day2, day3, day4, day5, day6, day7];
        const dayOfWeekScheduleFilter = dayOfWeekSchedule.filter(day => !!day); // filter notnull items

        setDayOfWeekSchedule(dayOfWeekScheduleFilter);
    }, [day1, day2, day3, day4, day5, day6, day7]); // Set DayOfWeekSchedule

    return (
        <div className="input-day-of-week-schedule">
            <InputDayOfWeekScheduleItem title="شنبه" setSchedule={setDay1} dayNumberOfWeek={1}/>
            <InputDayOfWeekScheduleItem title="یک شنبه" setSchedule={setDay2} dayNumberOfWeek={2}/>
            <InputDayOfWeekScheduleItem title="دو شنبه" setSchedule={setDay3} dayNumberOfWeek={3}/>
            <InputDayOfWeekScheduleItem title="سه شنبه" setSchedule={setDay4} dayNumberOfWeek={4}/>
            <InputDayOfWeekScheduleItem title="چهار شنبه" setSchedule={setDay5} dayNumberOfWeek={5}/>
            <InputDayOfWeekScheduleItem title="پنج شنبه" setSchedule={setDay6} dayNumberOfWeek={6}/>
            <InputDayOfWeekScheduleItem title="جمعه" setSchedule={setDay7} dayNumberOfWeek={7}/>
        </div>
    );
}

export default InputDayOfWeekSchedule;

