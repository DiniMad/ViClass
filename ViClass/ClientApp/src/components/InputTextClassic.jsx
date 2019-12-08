import React, {useEffect} from 'react';
import useInput from "./Hooks/useInput";

function InputTextClassic({title, onTextChange, inputRegex, placeHolder, width, length, lines = 1}) {
    const style = width
                  ? {width: width}
                  : null;

    const [text, handleTextChange] = useInput(inputRegex, length, lines);

    useEffect(() => {
        onTextChange(text);
    }, [text]);

    return (
        <div className="input-text-classic" style={style}>
            <input id={title}
                   className="year"
                   type="text"
                   name={title}
                   value={text}
                   onChange={handleTextChange}
                   placeholder={placeHolder}/>
            <label htmlFor={title}>{title}:</label>
            <div className="bar">{}</div>
        </div>
    );
}

export default InputTextClassic;