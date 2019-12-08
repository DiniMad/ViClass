import React, {useRef} from 'react';
import {Link} from "react-router-dom";
import {summarizeText} from "./Services/StringService";

function ChatMessageBox({senderUserId, text, byMe, sender, time}) {
    let classes = "chat-message-box" + (byMe
                                        ? " sender"
                                        : "");

    const timeTemplate = useRef(null);

    const chatMessageBoxMouseEnter = () => {
        timeTemplate.current.classList.add("display");
    };
    const chatMessageBoxMouseLeave = () => {
        timeTemplate.current.classList.remove("display");
    };


    return (
        <div className={classes} onMouseEnter={chatMessageBoxMouseEnter} onMouseLeave={chatMessageBoxMouseLeave}>
            {!byMe && <h6><Link to={`/user/${senderUserId}`}>{summarizeText(sender, 25)}</Link></h6>}
            <p>{text}</p>
            <div ref={timeTemplate} className="chat-message-box-time"><i>{time}</i></div>
        </div>
    );
}

export default ChatMessageBox;