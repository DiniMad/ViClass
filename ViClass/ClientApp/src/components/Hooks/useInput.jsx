import {useState, useEffect} from 'react';

function useInput(type, length, lines = 1) {
    const numberRange = getNumberRange(type);
    const regex = getRegex(type);

    const [text, setText] = useState("");

    useEffect(() => {
        setText("");
    }, []); // Reset value to empty on component mounted


    const handleTextChange = e => {
        const text = e.target.value;
        if (text.length > length) return;               // If number of characters is more than length

        const countOfNewLines = getNewLinesCount(text);
        if (countOfNewLines > lines) return;            // if number of new lines is more than lines

        if (numberRange) {                              // if it is number check for minimum and maximum allowed
            const number = parseInt(text);
            if (number < numberRange.min || number > numberRange.max) return;
        }

        const filteredText = text.match(regex);
        const result = filteredText                     // Dont allow two new line next to each other
                       ? filteredText[0].replace("\n\n", "\n")
                       : null;

        setText(result || "");

    };

    return [text, handleTextChange]
}

export default useInput;

const getRegex = type => {
    switch (type) {
        case "Number":
        case "Hour":
        case "Minute":
        case "Year":
        case "Month":
        case "Day":
            return /\d+/g;
        case "PerLetter":
            return /[آ-ی, ]+/g;
        case "PerText":
            return /[آ-ی, \n]+/g;
        case "EngLetter":
            return /^[a-zA-Z]+/g;
        case "Email":
            return /^[a-zA-Z0-9.!#$%&'*+/=?@^_`{|}~-]+/g;
        default:
            return /[^\n][\s\S]*/g;
    }
};// Specify regex pattern based on type
const getNewLinesCount = text => {
    const newLinesArray = text.match(/\n/g);
    return newLinesArray
           ? newLinesArray.length + 1
           : 1;
};
const getNumberRange = type => {
    if (type === "Hour") return {min: 0, max: 23};
    if (type === "Minute") return {min: 0, max: 59};
    if (type === "Month") return {min: 1, max: 12};
    if (type === "Day") return {min: 1, max: 31};
    return null
};