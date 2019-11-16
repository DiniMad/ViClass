import React, {useState, useEffect, useRef} from 'react';
import InputText from "./InputText";
import Navbar from "./Navbar";
import InputDayOfWeekSchedule from "./InputDayOfWeekSchedule";
import DateDetails from "./DateDetails";
import StudentNumberDetails from "./StudentNumberDetails";

function CreateClass() {

    const [dayOfWeekSchedule, setDayOfWeekSchedule] = useState([]);
    const [startDateFormatted, setStartDateFormatted] = useState("");
    const [endDateFormatted, setEndDateFormatted] = useState("");
    const [minStudentsNumber, setMinStudentsNumber] = useState("");
    const [maxStudentsNumber, setMaxStudentsNumber] = useState("");

    const warningElement = useRef(null);

    useEffect(() => {
        if (!warningElement) return;
        if (dayOfWeekSchedule.length > 0) warningElement.current.classList.add("display");
        else warningElement.current.classList.remove("display");
    }, [dayOfWeekSchedule.length]); // Display warning message if any day selected

    const handleSubmit = e => {
        e.preventDefault();
        // Validation object properties 
        // Post object
    };

    return (
        <>
            <Navbar/>
            <div className="create-class">
                <form onSubmit={handleSubmit}>
                    <InputText label="عنوان" name="title" length={30} inputRegex={undefined}/>
                    <InputText label="توضیحات" name="description" length={250} inputRegex={undefined} lines={4}/>
                    <StudentNumberDetails setMinimum={setMinStudentsNumber} setMaximum={setMaxStudentsNumber}/>
                    <DateDetails setStartDate={setStartDateFormatted} setEndDate={setEndDateFormatted}/>
                    <InputDayOfWeekSchedule setDayOfWeekSchedule={setDayOfWeekSchedule}/>
                    <div ref={warningElement} className="time-input-warning">
                        <p>زمان را در قالب 24 ساعته وارد کنید.</p>
                    </div>
                    <div className="register">
                        <input type="submit" value="ثبت"/>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateClass;