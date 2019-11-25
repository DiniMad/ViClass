import React, {useRef} from "react";
import {Link} from "react-router-dom";
import {nameOrEmail} from "./Services/UserObjcetService";

function ClassStudents({students, minNumber, maxNumber}) {

    const studentNumberDetails = useRef(null);

    const handleMouseEnter = () => studentNumberDetails.current.classList.add("hover");
    const handleMouseLeave = () => studentNumberDetails.current.classList.remove("hover");

    return (
        <div className="class-students" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h3 className="class-students-title">{students.length} دانشجو</h3>
            <div ref={studentNumberDetails} className="class-students-number">
                <div className="class-students-number-max"><p>{maxNumber || "∞"}</p></div>
                <div className="class-students-number-min"><p>{minNumber}</p></div>
            </div>
            <div className="class-students-items">
                {students.map(
                    s =>
                        s && (
                            <Link key={s.id} to={`/user/${s.id}`}>
                                <p>{nameOrEmail(s)}</p>
                            </Link>
                        )
                )}
            </div>
        </div>
    );
}

export default ClassStudents;
