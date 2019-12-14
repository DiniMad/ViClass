import React, {useState, useEffect} from 'react';
import ModalDialog from "./ModalDialog";
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";
import authService, {AuthenticationResultStatus} from "./api-authorization/AuthorizeService";

function Index() {
    const [displayFormsModal, setDisplayFormsModal] = useState(false);
    const [turnForms, setTurnForms] = useState(false);

    useEffect(() => {
        authenticateUser();
    }, []);

    const authenticateUser = async () => {
        const state = {returnUrl: "/dashboard"};

        const signInPromise = authService.signIn(state);

        setTimeout(() => {
            signInPromise.then(signInResult => {
                if (signInResult.status === AuthenticationResultStatus.Success)
                    window.location.replace("/dashboard");
                else
                    setDisplayFormsModal(true);
            })
        }, 2000);
    };

    const turn = () => setTurnForms(!turnForms);

    return (
        <div id="index">
            <ModalDialog visible={displayFormsModal} setVisibility={setDisplayFormsModal} canCloseModal={false}>
                <div id="index-forms" className={turnForms
                                                 ? "turn"
                                                 : null}>
                    <div id="index-forms-login" className="form-container">
                        <div className="form-wrapper">
                            <LoginPopup/>
                        </div>
                        <div className="btn-wrapper">
                            <button className="turn-button" onClick={turn}>ساخت حساب کاربری</button>
                        </div>
                    </div>
                    <div id="index-forms-register" className="form-container">
                        <div className="form-wrapper">
                            <RegisterPopup/>
                        </div>
                        <div className="btn-wrapper">
                            <button className="turn-button" onClick={turn}>ورود به حساب کاربری</button>
                        </div>
                    </div>
                </div>
            </ModalDialog>
        </div>
    );
}

export default Index;