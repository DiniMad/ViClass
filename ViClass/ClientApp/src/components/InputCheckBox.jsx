import React, {useState, useEffect} from 'react';

function InputCheckBox({checked, setChecked}) {
    // const [checked, setChecked] = useState(false);
    const [pointerConditionalClass, setPointerConditionalClass] = useState("");

    useEffect(() => {
        setPointerConditionalClass(checked
                                   ? " on"
                                   : "");
    }, [checked]);

    const onInputClick = () => setChecked(!checked);

    return (
        <>
            <div className="input">
                <div className="input-check-box" onClick={onInputClick}>
                    <p className="input-check-box-label">مرا به خاطر نگه دار</p>
                    <div className="input-check-box-switch">
                        <div className={"input-check-box-switch-pointer" + pointerConditionalClass}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InputCheckBox;