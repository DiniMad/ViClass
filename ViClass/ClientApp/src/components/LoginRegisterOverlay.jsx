import React, { Component } from "react";

export class LoginRegisterOverlay extends Component {
    state = { slideStyle: "slide", loginIframeSource: null };

    LoadRegisterPage = () => {
        this.setState({ slideStyle: "slide turn" });
    };

    LoadLoginPage = () => {
        this.setState({ slideStyle: "slide" });
    };
    render() {
        return (
            <div className="slide-container">
                <div className={this.state.slideStyle}>
                    <div className="slide-front">
                        <iframe
                            title="login-page"
                            src={this.props.loginIframeSrc}
                            name="login-page"
                            onLoad={this.props.onIframeLoaded}
                        ></iframe>
                        <div className="slide-switch-button">
                            <button
                                className="button"
                                onClick={this.LoadRegisterPage}
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
                            onLoad={this.props.onIframeLoaded}
                        ></iframe>
                        <div className="slide-switch-button">
                            <button
                                className="button"
                                onClick={this.LoadLoginPage}
                            >
                                ورود به حساب کاربری
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
