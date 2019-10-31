const getAllPositionsOfCharacter = (text, character) => {
    let indexes = [0];

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === character) indexes[indexes.length] = i;
    }

    indexes[indexes.length] = text.length;
    return indexes;
};
export const summarizeText = (text, length, lineWrapLength = 0) => {
    // Check if every line has at least one white space (for Description field).
    if (lineWrapLength !== 0) {
        let indexOfWhiteSpaces = getAllPositionsOfCharacter(text, " ");
        for (let i = 1; i < indexOfWhiteSpaces.length; i++) {
            const textBetweenSpaces = text.substring(indexOfWhiteSpaces[i - 1], indexOfWhiteSpaces[i]);
            if (textBetweenSpaces.length > lineWrapLength) {
                let previousPartOfText = text.substring(0, indexOfWhiteSpaces[i - 1]);
                let cutOfText = text.substring(indexOfWhiteSpaces[i - 1], indexOfWhiteSpaces[i]);
                let resultText = cutOfText.substring(0, lineWrapLength - 3);
                return previousPartOfText + resultText + "...";
            }
        }
    }
    if (text.length <= length) return text;
    let cutOfText = text.substring(0, length - 3);
    let indexOfLastWhiteSpace = cutOfText.lastIndexOf(" ");
    // If there is no white space
    if (indexOfLastWhiteSpace === -1) indexOfLastWhiteSpace = text.length - 3;
    let cutOfTextOnWhiteSpace = cutOfText.substring(0, indexOfLastWhiteSpace);
    return cutOfTextOnWhiteSpace + "...";
};
export const isPastAsPersianDate = (dateToCheck, currentDate) => {
    let dateYear, dateMonth, dateDay, nowYear, nowMonth, nowDay;
    try {
        // Destructuring properties from dates
        dateYear = parseInt(dateToCheck.split("/")[0]);
        dateMonth = parseInt(dateToCheck.split("/")[1]);
        dateDay = parseInt(dateToCheck.split("/")[2]);
        nowYear = parseInt(currentDate.split("/")[0]);
        nowMonth = parseInt(currentDate.split("/")[1]);
        nowDay = parseInt(currentDate.split("/")[2]);
    } catch {
        throw "Parameter is not in a valid persian date format.";
    }

    // If years not same
    if (dateYear !== nowYear) return nowYear > dateYear;
    // If months not same
    if (dateMonth !== nowMonth) return nowMonth > dateMonth;
    // If days not same
    if (dateDay !== nowDay) return nowDay > dateDay;
    // If it is same year same month and same day(means its today) then its not past
    return false;
};
