import React, {useState} from "react";
import ClassInstructor from "./ClassInstructor";
import ClassStudents from "./ClassStudents";
import ClassDate from "./ClassDate";
import ClassSharedFiles from "./ClassSharedFiles";
import ClassVideos from "./ClassVideos";
import Navbar from "./Navbar";
import ClassOptionButton from "./ClassOptionButton";
import ClassGoLiveButton from "./ClassGoLiveButton";
import useGetData from "./Hooks/useGetData";
import {summarizeText} from "./Services/StringService";
import Config from "../config";

const classApi = Config.ApiEndpoints.Class;
const titleMaxLengthAllowed = Config.TextsMaxLength.ClassTitle;
const descriptionMaxLengthAllowed = Config.TextsMaxLength.ClassDescription;

function Class(props) {
    const classId = props.match.params.id;

    // A property to notify "useGetData" to re-fetch data on class information (Option Button) changed.
    const [getDataDependency, setGetDataDependency] = useState(null);
    const [classObject, responseStatus] = useGetData(classApi + classId, undefined, getDataDependency);

    return (
        <>
            <Navbar/>
            {responseStatus === 404 && <p>کلاس وجود ندارد</p>}
            {responseStatus === 200 && classObject && (
                <div className="container-percent">
                    <div className="class">
                        <ClassOptionButton classId={classObject.id}
                                           relationWithUser={classObject.relationWithUser}
                                           studentsNumber={classObject.students.length}
                                           setDataDependency={setGetDataDependency}
                                           replaceURL={props.history.replace}
                                           maxNumber={classObject.maxStudentNumber}/>
                        <ClassGoLiveButton classId={classObject.id}
                                           classTitle={classObject.title}
                                           instructorId={classObject.instructor.id}
                                           relationWithUser={classObject.relationWithUser}
                                           streamKye={classObject.streamKey}/>
                        <ClassInstructor instructor={classObject.instructor}/>
                        <div className="class-title">
                            <h1>{summarizeText(classObject.title, titleMaxLengthAllowed)}</h1>
                        </div>
                        <div className="class-description">
                            <h2>{summarizeText(classObject.description, descriptionMaxLengthAllowed, 85)}</h2>
                        </div>
                        <ClassStudents students={classObject.students}
                                       minNumber={classObject.minStudentNumber}
                                       maxNumber={classObject.maxStudentNumber}/>
                        <ClassDate
                            startDate={classObject.startDateFormatted}
                            endDate={classObject.endDateFormatted}
                            dayOfWeeks={classObject.dayOfWeekSchedules}/>
                        <ClassSharedFiles classId={classObject.id}
                                          sharedFiles={classObject.sharedFiles}
                                          relationWithUser={classObject.relationWithUser}
                                          setDataDependency={setGetDataDependency}/>
                        <ClassVideos shouldPresentVideo={classObject.shouldPresentVideo}
                                     videos={classObject.videos}
                                     classId={classObject.id}
                                     relationWithUser={classObject.relationWithUser}
                                     setDataDependency={setGetDataDependency}/>
                    </div>
                </div>
            )}
        </>
    );
}

export default Class;
