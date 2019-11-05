import React from "react";
import RemoveIcon from "../image/RemoveIcon.svg";
import PlusIcon from "../image/PlusIcon.svg";

function ClassOptionButton({classId, relationWithUser}) {
    const none = 0,
        student = 1,
        instructor = 2;

    const className = relationWithUser === none
                      ? "sub"
                      : relationWithUser === student
                        ? "unsub"
                        : "remove";

    const imageSource = relationWithUser === instructor
                        ? RemoveIcon
                        : PlusIcon;

    const imageAltText = relationWithUser === none
                         ? "Subscribe button"
                         : relationWithUser === student
                           ? "Unsubscribe button"
                           : "Remove icon";

    const title = relationWithUser === none
                  ? "Subscribe"
                  : relationWithUser === student
                    ? "Unsubscribe"
                    : "Remove";

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
            <div className={"class-option-button-content " + className}>
                <img title={title} src={imageSource} alt={imageAltText}/>
            </div>
        </button>
    );
}

export default ClassOptionButton;
