import React, {useState, useEffect, useContext} from 'react';
import InputText from "./InputText";
import Loading from "./Loading";
import useRegister from "./Hooks/useRegister";
import NotificationContext from "./Context/NotificationContext";

function RegisterPopup() {
    const [email, setEmail] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [displayEmailError, setDisplayEmailError] = useState(false);
    const [displayStudentNumberError, setDisplayStudentNumberError] = useState(false);
    const [displayPasswordError, setDisplayPasswordError] = useState(false);
    const [displayPasswordConfirmationError, setDisplayPasswordConfirmationError] = useState(false);
    const [displayLoading, setDisplayLoading] = useState(false);

    const displayNotification = useContext(NotificationContext);

    const register = useRegister(onRegisterResponseReceive);

    useEffect(() => {
        if (password === passwordConfirmation) setDisplayPasswordConfirmationError(false);
    }, [password, passwordConfirmation]);

    function onRegisterResponseReceive(errors) {
        if (!errors) return;
        setDisplayLoading(false);
        if (errors.Email) setDisplayEmailError(true);
        if (errors.StudentNumber) setDisplayStudentNumberError(true);
        if (errors.Password) setDisplayPasswordError(true);
        if (errors.studentNumberTaken && errors.emailTaken) {
            displayNotification("شماره دانشجویی و ایمیل وارد شده در سیستم وجود دارد.", 5, "warning")
        }
        else if (errors.studentNumberTaken) {
            displayNotification("شماره دانشجویی وارد شده در سیستم وجود دارد.", 5, "warning")
        }
        else if (errors.emailTaken) {
            displayNotification("ایمیل وارد شده در سیستم وجود دارد.", 5, "warning")
        }
    }

    const submit = e => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            setDisplayPasswordConfirmationError(true);
            setDisplayStudentNumberError(false);
            setDisplayEmailError(false);
            setDisplayPasswordError(false);
            return
        }

        const registerModel = {
            email,
            studentNumber,
            password
        };

        register(registerModel);

        setDisplayEmailError(false);
        setDisplayStudentNumberError(false);
        setDisplayPasswordError(false);
        setDisplayPasswordConfirmationError(false);

        // Display a loading template so user makes sure something is going on
        setDisplayLoading(true);
    };

    return (
        <>
            <Loading displayLoading={displayLoading} setDisplayLoading={setDisplayLoading}/>
            <div id="register-popup">
                <form onSubmit={submit}>

                    <div className="inout-with-error">
                        <div className={"input-error-message" + (displayEmailError
                                                                 ? " show"
                                                                 : "")}>
                            <p>ایمیل وارد شده اشتباه است.</p>
                        </div>
                        <InputText name="email"
                                   setText={setEmail}
                                   inputRegex="Email"
                                   width="80%"
                                   label="ایمیل"/>
                    </div>

                    <div className="inout-with-error">
                        <div className={"input-error-message" + (displayStudentNumberError
                                                                 ? " show"
                                                                 : "")}>
                            <p>شماره دانشجویی یک عدد 10 رقمی است.</p>
                        </div>
                        <InputText name="studentNumber"
                                   setText={setStudentNumber}
                                   inputRegex="Number"
                                   length={10}
                                   width="80%"
                                   label="شماره دانشجویی"/>
                    </div>

                    <div className="inout-with-error">
                        <div className={"input-error-message" + (displayPasswordError
                                                                 ? " show"
                                                                 : "")}>
                            <p>رمز عبور رشته ای به طول حداقل 6 کارکتر شامل حداقل یک حرف و یک عدد است.</p>
                        </div>
                        <InputText name="password"
                                   setText={setPassword}
                                   inputRegex="Password"
                                   width="80%"
                                   label="رمز عبور"/>
                    </div>

                    <div className="inout-with-error">
                        <div className={"input-error-message" + (displayPasswordConfirmationError
                                                                 ? " show"
                                                                 : "")}>
                            <p>رمز عبور با تکرار آن مطابقت ندارد.</p>
                        </div>
                        <InputText name="passwordConfirmation"
                                   setText={setPasswordConfirmation}
                                   inputRegex="Password"
                                   width="80%"
                                   label="تکرار رمز عبور"/>
                    </div>

                    <div className="submit-button">
                        <input type="submit" value="ایجاد"/>
                    </div>
                </form>
            </div>
        </>
    );
}

export default RegisterPopup;