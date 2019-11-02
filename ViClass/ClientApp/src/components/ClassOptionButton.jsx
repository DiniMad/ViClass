import React from "react";
import RemoveIcon from "../image/RemoveIcon.svg";

function ClassOptionButton({ classId, relationWithUser }) {
    const none = 0,
        student = 1,
        instructor = 2;

    const handleOptionButton = async () => {
        // TODO: Implement functionality based on relationWithUser property
        switch (relationWithUser) {
            case none:
                break;
            case student:
                break;
            case instructor:
                break;
            default:
                throw "relationWithUser property is not valid.";
        }
    };

    return (
        <button className="class-option-button" onClick={handleOptionButton}>
            <div
                className={
                    "class-option-button-content " +
                    (relationWithUser === none ? "sub" : relationWithUser === student ? "unsub" : "remove")
                }
            >
                {relationWithUser === instructor ? <img src={RemoveIcon} alt="Remove icon" /> : <p>+</p>}
            </div>
        </button>
    );
}

export default ClassOptionButton;
