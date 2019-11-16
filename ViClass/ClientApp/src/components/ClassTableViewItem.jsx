import React from 'react';
import {Link} from "react-router-dom";
import {nameOrEmail} from "./Services/UserObjcetService";
import {summarizeText} from "./Services/StringService";
import DateService from "./Services/DateService";
import InstructorIcon from "../image/InstructorIcon.svg"
import StudentIcon from "../image/StudentIcon.svg"

function ClassTableViewItem({classObject}) {
    let dateBadgeClasses, dateBadgeText;
    // Destructuring properties
    let {
        id,
        title,
        description,
        instructor,
        dayOfWeekSchedules,
        startDateFormatted,
        endDateFormatted,
        relationWithUser,
        students
    } = classObject;

    const {dateServiceInitiated, whenIsNextClassDate} = DateService();
    
    [dateBadgeClasses, dateBadgeText] = dateServiceInitiated
                                        ? whenIsNextClassDate(startDateFormatted, endDateFormatted, dayOfWeekSchedules)
                                        : [null, null];

    return (
        <div className="class-table-view-item">
            <div className="class-table-view-item-icon">
                <img src={relationWithUser === 2
                          ? InstructorIcon
                          : StudentIcon} alt="Instructor icon."/>
            </div>
            <div className="class-table-view-item-title">
                <Link to={`/class/${id}`}><p>{summarizeText(title, 35)}</p></Link>
            </div>
            <div className="class-table-view-item-description">
                <p>{summarizeText(description, 55)}</p>
            </div>
            <div className="class-table-view-item-instructor">
                مدرس: <Link to={`/user/${instructor.id}`}>{summarizeText(nameOrEmail(instructor), 22)}</Link>
            </div>
            <div className="class-table-view-item-date">
                <p className={dateBadgeClasses}>{dateBadgeText}</p>
            </div>
            <div className="class-table-view-item-students-count">{`${students.length} دانشجو`}</div>
        </div>
    );
}

export default ClassTableViewItem;