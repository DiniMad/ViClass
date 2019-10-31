import React from "react";

function ClassSubscribeButton({ classId, students }) {
    // TODO: Invert the if expresion below
    const isTeacher = students[0] === null;
    if (isTeacher) return <></>;
    
    
    return (
        <div className="class-option-button">
            <div>|</div>
        </div>
    );
}

export default ClassSubscribeButton;
