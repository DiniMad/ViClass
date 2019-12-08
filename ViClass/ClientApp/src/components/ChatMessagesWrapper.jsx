import React, {useEffect, useRef} from 'react';

function ChatMessagesWrapper({children}) {
    const messagesWrapper = useRef(null);

    useEffect(() => {
        const messageBody = messagesWrapper.current;
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }, [children]); // On new message added scroll to bottom

    return (
        <div ref={messagesWrapper} id="chat-message-list">
            {children}
        </div>
    );
}

export default ChatMessagesWrapper;