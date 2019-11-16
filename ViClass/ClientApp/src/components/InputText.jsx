import React, {useState} from 'react';
import useInput from "./Hooks/useInput";

function InputText({name, label, inputRegex,length, inputClass, lines = 1, width}) {
    let style = width
                ? {width: width}
                : null;

    const [text, handleTextChange] = useInput(inputRegex, length, lines);

    return (
        <div className="input-text" style={style}>
            {lines === 1
             ? <input type="text" name={name} id={name} className={inputClass} value={text} onChange={handleTextChange}
                      required/>
             : <textarea name={name} id={name} className={inputClass} value={text} onChange={handleTextChange}
                         rows={lines} required/>
            }
            <label htmlFor={name}>{label}</label>
            <div className="bar">{}</div>
        </div>
    );
}

export default InputText;