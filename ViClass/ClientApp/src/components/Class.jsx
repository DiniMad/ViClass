import React, { useContext } from "react";
import useGetData from "./Hooks/useGetData";
import Config from "../config";
import { summarizeText } from "./Services/StringService";
import ClassInstructor from "./ClassInstructor";
import ClassStudents from "./ClassStudents";
import ClassDate from "./ClassDate";
import ClassSharedFiles from "./ClassSharedFiles";
import ClassVideos from "./ClassVideos";
import Navbar from "./Navbar";
import ClassSubscribeButton from "./ClassSubscribeButton";
import UserContext from "./Context/UserContext";

const classApi = Config.ApiEndpoints.Class;

function Class(props) {
    const classId = props.match.params.id;

    const { data: classObject, responseStatus } = useGetData(classApi + classId);
    const user = useContext(UserContext);

    // TODO: Remove the log below
    classObject && console.log(classObject);
    // TODO: Remove the dummy data below
    if (classObject) {
        classObject.title =
            classObject.title + classObject.title + classObject.title + classObject.title + classObject.title;
        classObject.dayOfWeekSchedules[2] = Object.assign({}, classObject.dayOfWeekSchedules[0]);
        classObject.dayOfWeekSchedules[2].id = 3;
        classObject.dayOfWeekSchedules[2].dayOfWeek = 2;
        classObject.dayOfWeekSchedules[2].startTimeFormatted = "20:00";
        classObject.dayOfWeekSchedules[2].endTimeFormatted = "22:00";
        classObject.dayOfWeekSchedules[3] = Object.assign({}, classObject.dayOfWeekSchedules[0]);
        classObject.dayOfWeekSchedules[3].id = 4;
        classObject.dayOfWeekSchedules[3].dayOfWeek = 3;
        classObject.dayOfWeekSchedules[3].startTimeFormatted = "20:00";
        classObject.dayOfWeekSchedules[3].endTimeFormatted = "22:00";
        classObject.dayOfWeekSchedules[4] = Object.assign({}, classObject.dayOfWeekSchedules[0]);
        classObject.dayOfWeekSchedules[4].id = 5;
        classObject.dayOfWeekSchedules[4].dayOfWeek = 4;
        classObject.dayOfWeekSchedules[4].startTimeFormatted = "20:00";
        classObject.dayOfWeekSchedules[4].endTimeFormatted = "22:00";
        classObject.dayOfWeekSchedules[5] = Object.assign({}, classObject.dayOfWeekSchedules[0]);
        classObject.dayOfWeekSchedules[5].id = 6;
        classObject.dayOfWeekSchedules[5].dayOfWeek = 6;
        classObject.dayOfWeekSchedules[5].startTimeFormatted = "20:00";
        classObject.dayOfWeekSchedules[5].endTimeFormatted = "22:00";
        classObject.dayOfWeekSchedules[6] = Object.assign({}, classObject.dayOfWeekSchedules[0]);
        classObject.dayOfWeekSchedules[6].id = 7;
        classObject.dayOfWeekSchedules[6].dayOfWeek = 7;
        classObject.dayOfWeekSchedules[6].startTimeFormatted = "20:00";
        classObject.dayOfWeekSchedules[6].endTimeFormatted = "22:00";
    }

    return (
        <>
            <Navbar />
            {responseStatus === 404 && <p>کلاس وجود ندارد</p>}
            {classObject && (
                <div className="container-percent">
                    <div className="class">
                        <ClassSubscribeButton classId={classObject.id} students={classObject.students} />
                        <ClassInstructor instructor={classObject.instructor} />
                        <div className="class-title">
                            <h1>{summarizeText(classObject.title, 64)}</h1>
                        </div>
                        <div className="class-description">
                            <h2>{summarizeText(classObject.description, 512, 85)}</h2>
                        </div>
                        <ClassStudents students={classObject.students} />
                        <ClassDate
                            startDate={classObject.startDateFormatted}
                            endDate={classObject.endDateFormatted}
                            dayOfWeeks={classObject.dayOfWeekSchedules}
                        />
                        <ClassSharedFiles sharedFiles={classObject.sharedFiles} />
                        <ClassVideos shouldPresentVideo={classObject.shouldPresentVideo} videos={classObject.videos} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Class;
