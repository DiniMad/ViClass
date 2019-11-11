import {useState, useEffect} from 'react';

function useInput(type = "EngLetter", length, resetCondition = []) {
    let regex;

    const [text, setText] = useState("");

    useEffect(() => {
        resetCondition && setText("");
    }, [resetCondition]); // Reset value to empty on resetCondition is true

    switch (type) {
        case "Number":
            regex = /\d+/g;
            break;
        case "PerLetter":
            regex = /[آ-ی, ]+/g;
            break;
        case "EngLetter":
            regex = /^[a-zA-Z]+/g;
            break;
        case "Email":
            regex = /^[a-zA-Z0-9.!#$%&'*+/=?@^_`{|}~-]+/g;
            break;
        default:
            regex = /[\s\S]+/g;
            break;
    } // Specify regex pattern based on type

    const handleTextChange = e => {
        let text = e.target.value;

        if (text.length <= length) {
            const result = text.match(regex);
            setText(result || "");
        }
    };

    return {text, handleTextChange}
}

export default useInput;