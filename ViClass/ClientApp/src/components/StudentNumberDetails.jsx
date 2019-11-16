import React from 'react';
import InputTextClassic from "./InputTextClassic";

function StudentNumberDetails({setMinimum, setMaximum}) {

    const minTextChange = text => setMinimum(text);
    const maxTextChange = text => setMaximum(text);


    return (
        <div className="student-number-details">
            <InputTextClassic title="حداقل تعداد دانشجو" length="2" inputRegex="Number" placeHolder="10" width="30%"
                              onTextChange={minTextChange}/>
            <InputTextClassic title="حداکثر تعداد دانشجو" length="2" inputRegex="Number" placeHolder="50" width="30%"
                              onTextChange={maxTextChange}/>
        </div>
    );
}

export default StudentNumberDetails;