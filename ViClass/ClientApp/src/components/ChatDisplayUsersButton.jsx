import React from 'react';
import UserIcon from "../image/UserProfileImage.svg"
import PlusIcon from "../image/PlusIcon.svg"

function ChatDisplayUsersButton({displayState, onDisplayButtonClick}) {
    return (
        <div id="chat-users-button">
            <button className={displayState
                               ? "display"
                               : ""}
                    onClick={onDisplayButtonClick}>
                <img src={UserIcon} alt="Contacts Icon"/>
                <img className="rotate" src={PlusIcon} alt="Cross Icon"/>
            </button>
        </div>
    );
}

export default ChatDisplayUsersButton;