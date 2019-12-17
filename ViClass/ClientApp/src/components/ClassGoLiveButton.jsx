import React, {useState} from 'react';
import {Link} from "react-router-dom";
import ModalDialog from "./ModalDialog";
import LiveIcon from "../image/LiveIcon.svg"

const none = 0,
    student = 1,
    instructor = 2;

function ClassGoLiveButton({classId, classTitle, instructorId, relationWithUser, streamKye}) {
    if (relationWithUser === none) return (<></>);
    const [confirmText, confirmSubmitButtonText] = getDetails(relationWithUser);

    const [displayLiveConfirmationModal, setDisplayLiveConfirmationModal] = useState(false);

    const handleGoLiveButton = () => setDisplayLiveConfirmationModal(true);
    const handleCancelButton = () => setDisplayLiveConfirmationModal(false);
    return (
        <>
            {(streamKye || relationWithUser === instructor) &&
            <>
                <button className="class-go-live-button" onClick={handleGoLiveButton}>
                    <div className="class-go-live-button-content">
                        <img title="Go Live" src={LiveIcon} alt="Go Live"/>
                    </div>
                </button>
                <ModalDialog visible={displayLiveConfirmationModal} setVisibility={setDisplayLiveConfirmationModal}>
                    <form className="class-confirmation-modal">
                        <p>{confirmText}</p>
                        <div className="class-confirmation-modal-buttons">
                            <Link to={`/live/${classId}/${classTitle}/${instructorId}`}>{confirmSubmitButtonText}</Link>
                            <input type="button" value="بیخیال" onClick={handleCancelButton}/>
                        </div>
                    </form>
                </ModalDialog>
            </>}
        </>
    );
}

export default ClassGoLiveButton;
const getDetails = relationWithUser => {
    let confirmModalText, confirmModalSubmitButtonText;

    if (relationWithUser === student) {
        confirmModalText = "وارد پخش زنده میشوید؟";
        confirmModalSubmitButtonText = "ورود";
    }
    else if (relationWithUser === instructor) {
        confirmModalText = "پخش زنده کلاس را شروع میکنید؟";
        confirmModalSubmitButtonText = "شروع";
    }

    return [confirmModalText, confirmModalSubmitButtonText];
};