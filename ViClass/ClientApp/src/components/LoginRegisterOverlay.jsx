import React, {useState} from "react";

function LoginRegisterOverlay(props) {

    const [slideStyle, setSlideStyle] = useState("slide");

    const LoadRegisterPage = () => {
        setSlideStyle("slide turn");
    };
    const LoadLoginPage = () => {
        setSlideStyle("slide");
    };

    // noinspection HtmlUnknownTarget,JSUnresolvedVariable
    return (
        <div className="slide-container">
            <div className={slideStyle}>
                <div className="slide-front">
                    <iframe
                        title="login-page"
                        src={props.loginIframeSrc}
                        name="login-page"
                        onLoad={props.onIframeLoaded}
                    />
                    <div className="slide-switch-button">
                        <button
                            className="button"
                            onClick={LoadRegisterPage}
                        >
                            ساخت حساب کاربری
                        </button>
                    </div>
                </div>
                <div className="slide-back">
                    <iframe
                        title="register-page"
                        src="/Identity/Account/Register"
                        name="register-page"
                        onLoad={props.onIframeLoaded}
                    />
                    <div className="slide-switch-button">
                        <button
                            className="button"
                            onClick={LoadLoginPage}
                        >
                            ورود به حساب کاربری
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginRegisterOverlay;

    
   
