import React from "react";
import { Link } from "react-router-dom";

function ClassStudents({students}) {
    return (
        <div className="class-students">
            <h3 className="class-students-title">{students.length} دانشجو</h3>
            <div className="class-students-items">
                {students.map(
                    s =>
                        s && (
                            <Link key={s.id} to={`/user/${s.id}`}>
                                <p>{s.userName}</p>
                            </Link>
                        )
                )}
            </div>
        </div>
    );
}

export default ClassStudents;
