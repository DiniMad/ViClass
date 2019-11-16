import React from 'react';
import InputDate from "./InputDate";

function DateDetails({setStartDate, setEndDate}) {
    return (
        <div className="date-details">
            <InputDate title="تاریخ شروع" setDate={setStartDate} width="25rem"/>
            <InputDate title="تاریخ پایان" setDate={setEndDate} width="25rem"/>
        </div>
    );
}

export default DateDetails;