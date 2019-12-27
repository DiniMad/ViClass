import React, {useState, useEffect, useRef, useContext} from 'react';
import InputText from "./InputText";
import Navbar from "./Navbar";
import InputDayOfWeekSchedule from "./InputDayOfWeekSchedule";
import DateDetails from "./DateDetails";
import StudentNumberDetails from "./StudentNumberDetails";
import NotificationContext from "./Context/NotificationContext";
import ClassService from "./Services/ClassService";
import usePostData from "./Hooks/usePostData";
import Config from "../config";

const classApi = Config.ApiEndpoints.Class;
const titleMaxLengthAllowed = Config.TextsMaxLength.ClassTitle;
const descriptionMaxLengthAllowed = Config.TextsMaxLength.ClassDescription;

function CreateClass({history}) {
    const {validateStudentsNumber, validationDateDetails, validateDayOfWeekSchedule} = ClassService();
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dayOfWeekSchedules, setDayOfWeekSchedule] = useState([]);
    const [startDateFormatted, setStartDateFormatted] = useState("");
    const [endDateFormatted, setEndDateFormatted] = useState("");
    const [minStudentNumber, setMinStudentsNumber] = useState("");
    const [maxStudentNumber, setMaxStudentsNumber] = useState("");

    const warningElement = useRef(null);

    const displayNotification = useContext(NotificationContext);

    const [creatClassResponseData, creatClassResponseStatus, postNewClass] = usePostData(classApi);

    useEffect(() => {
        if (!warningElement) return;
        if (dayOfWeekSchedules.length > 0) warningElement.current.classList.add("display");
        else warningElement.current.classList.remove("display");
    }, [dayOfWeekSchedules.length]); // Display warning message if any day selected
    useEffect(() => {
        if (!creatClassResponseData) return;

        if (creatClassResponseStatus === 201) {
            displayNotification("کلاس با موفقیت ایجاد شده.", 5, "success");
            history.push(`/class/${creatClassResponseData}`);
        }
        else displayNotification("مشکلی در حین ایجاد کلاس بوجود آمده است.", 5, "warning");

    }, [creatClassResponseData, creatClassResponseStatus]);


    const handleSubmit = async e => {
        let error;
        e.preventDefault();

        // Validation object properties 
        if (!title.trim()) {                                                        // Validate Tittle
            displayNotification("عنوان نمیتواند خالی باشد.", 5, "warning");
            return;
        }
        if (!description.trim()) {                                                  // Validate Description
            displayNotification("توضیحات نمیتواند خالی باشد.", 5, "warning");
            return;
        }
        error = validateStudentsNumber(minStudentNumber, maxStudentNumber);       // Validate Students Number
        if (error) {
            displayNotification(error, 5, "warning");
            return;
        }
        error = await validationDateDetails(startDateFormatted, endDateFormatted);  // Validate Date Details
        if (error) {
            displayNotification(error, 5, "warning");
            return;
        }
        error = validateDayOfWeekSchedule(dayOfWeekSchedules);                       // Validate Schedule
        if (error) {
            displayNotification(error, 5, "warning");
            return;
        }

        let minStudent = Number(minStudentNumber);
        let maxStudent = !maxStudentNumber
                         ? null
                         : Number(maxStudentNumber);

        // Post object
        const newClass = {
            title,
            description,
            dayOfWeekSchedules,
            startDateFormatted,
            endDateFormatted,
            minStudentNumber: minStudent,
            maxStudentNumber: maxStudent,
            shouldPresentVideo: true
        };
        postNewClass(newClass);
    };

    return (
        <>
            <Navbar/>
            <div className="create-class">
                <form onSubmit={handleSubmit}>
                    <InputText label="عنوان" name="title" length={titleMaxLengthAllowed} inputRegex={undefined}
                               setText={setTitle}/>
                    <InputText label="توضیحات" name="description" length={descriptionMaxLengthAllowed}
                               inputRegex={undefined} lines={6}
                               setText={setDescription}/>
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