import React from 'react';
import WarningIcon from "../image/WarningIcon.svg"
import TickIcon from "../image/TickIcon.svg"
import AddIcon from "../image/AddIcon.svg"

function UserDetailBox({name, title, text, icon, isValidate, isHimSelf, children}) {
    const imageClasses = isValidate
                         ? "icon"
                         : "btn";
    const imageSource = !text
                        ? AddIcon
                        : isValidate
                          ? TickIcon
                          : WarningIcon;
    const imageAltText = !text
                         ? "Add icon"
                         : isValidate
                           ? "Tick icon"
                           : "Warning icon";
    const imageTitle = !text
                       ? "Add"
                       : isValidate
                         ? "Validated"
                         : "Validate";

    const handleButtonClick = () => {
        // It is add button
        if (!text) {

        }
        // It is validate button
        else if (!isValidate) {

        }
        // It is Validated icon
    };

    // If it's not himself just render student number
    if (!isHimSelf && title !== "Student Number") return <></>;
    return (
        <div className="user-detail-box"><
            img src={icon} alt={text} title={title}/>
            <p title={title}>{text || `${name} وارد نشده است.`}</p>
            {isHimSelf && (<button className="user-detail-box-button" onClick={handleButtonClick}>
                <img
                    className={imageClasses}
                    src={imageSource}
                    alt={imageAltText}
                    title={imageTitle}
                /></button>)}
            {isHimSelf && children}
        </div>
    );
}

export default UserDetailBox;