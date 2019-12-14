import React, {useState, useEffect} from 'react';
import InputText from "./InputText";
import InputCheckBox from "./InputCheckBox";
import Loading from "./Loading";
import useLogin from "./Hooks/useLogin";

function LoginPopup() {
    const [studentNumber, setStudentNumber] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [displayPasswordError, setDisplayPasswordError] = useState(false);
    const [displayLoading, setDisplayLoading] = useState(false);

    const login = useLogin(onLoginResponseReceive);

    useEffect(() => {
        if (password.length >= 6) setDisplayPasswordError(false);
    }, [password]);
    
    function onLoginResponseReceive(statusCode) {
        if(statusCode!==200) setDisplayLoading(false);
    }

    const Submit = e => {
        e.preventDefault();

        if (password.length < 6) {
            setDisplayPasswordError(true);
            return;
        }

        let LoginModel = {
            studentNumber,
            password,
            rememberMe
        };

        login(LoginModel);

        setDisplayPasswordError(false);

        // Display a loading template so user makes sure something is going on
        setDisplayLoading(true);
    };

    return (
        <>
            <Loading displayLoading={displayLoading} setDisplayLoading={setDisplayLoading}/>
            <div id="login-popup">
                <form onSubmit={Submit}>
                    <InputText name="studentNumber"
                               setText={setStudentNumber}
                               inputRegex="Number"
                               length={10}
                               width="80%"
                               label="شماره دانشجویی"/>
                    <div className="inout-with-error">
                        <div className={"input-error-message" + (displayPasswordError
                                                                 ? " show"
                                                                 : "")}>
                            <p>رمز عبور حداقل 6 کارکتر است.</p>
                        </div>
                        <InputText name="password"
                                   setText={setPassword}
                                   width="80%"
                                   label="رمز عبور"/>
                    </div>
                    <InputCheckBox checked={rememberMe} setChecked={setRememberMe}/>
                    <div className="submit-button">
                        <input type="submit" value="ورود"/>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginPopup;