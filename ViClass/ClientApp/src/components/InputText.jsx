import React, {useEffect} from 'react';
import useInput from "./Hooks/useInput";

function InputText({name, label, inputRegex, length, inputClass, lines = 1, width, setText, inputRef}) {
    let inputType = name === "password" || inputRegex === "Password"
                    ? "password"
                    : "text";
    let style = width
                ? {width: width}
                : null;

    const [text, handleTextChange] = useInput(inputRegex, length, lines);

    useEffect(() => {
        if (setText)
            setText(text);
    }, [text]);
    return (
        <div className="input-text" style={style}>
            {lines === 1
             ? <input ref={inputRef} type={inputType} name={name} id={name} className={inputClass} value={text}
                      onChange={handleTextChange}
                      required/>
             : <textarea ref={inputRef} name={name} id={name} className={inputClass} value={text}
                         onChange={handleTextChange}
                         rows={lines} required/>
            }
            <label htmlFor={name}>{label}</label>
            <div className="bar">{}</div>
        </div>
    );
}

export default InputText;