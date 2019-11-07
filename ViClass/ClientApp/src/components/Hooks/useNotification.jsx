import {useState, useRef} from 'react';

let notificationType;

function useNotification() {
    const [display, setDisplay] = useState(false);
    const textTag = useRef(null);

    const displayNotification = (text, displayTimeInSec, type = "info") => {
        if (!text || !displayTimeInSec) throw 'Invalid call to the function "displayNotification"';

        textTag.current.innerHTML = text;
        notificationType = type;
        setDisplay(true);

        setTimeout(() => {
            setDisplay(false);
        }, displayTimeInSec * 1000)
    };

    return {display, textTag, notificationType, displayNotification};
}

export default useNotification;