import React, {useState,useRef} from 'react';
import ArrowIcon from "../image/ArrowIconPointToLeft.svg"

const newMessageLengthAllowed = 100;

function ChatEnterMessage({sendMessage}) {
    let keysPressed = {};

    const [inputText, setInputText] = useState("");
    const textInput = useRef(null);

    const handleTextChange = e => {
        let text = e.target.value.trimStart();
        if (!!text && text.length > newMessageLengthAllowed) return;
        setInputText(text);
    };
    const onInputKeyDown = e => {
        keysPressed[e.key] = true;

        if (keysPressed['Shift'] && keysPressed['Enter']) {
            e.key = "Enter";
        }
        else if (keysPressed['Enter']) {
            e.preventDefault();
            sendNewMessage();
        }
    };
    const onInputKeyUp = e => delete keysPressed[e.key];
    const sendNewMessage = () => {
        if (!inputText.trim()) {
            // Display notification
            return;
        }
        sendMessage(inputText);
        setInputText("");
        if(textInput) textInput.current.focus();
    };
    return (
        <div id="chat-enter-message">
            <button onClick={sendNewMessage}><img src={ArrowIcon} alt="Send Button"/></button>
            <textarea ref={textInput}
                      value={inputText}
                      onChange={handleTextChange}
                      onKeyDown={onInputKeyDown}
                      onKeyUp={onInputKeyUp}
                      name="new-message"
                      id="new-message"
                      placeholder="پیام جدید"/>
        </div>
    );
}

export default ChatEnterMessage;