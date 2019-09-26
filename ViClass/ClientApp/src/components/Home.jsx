import React, { Component } from "react";
import { LoginRegisterOverlay } from "./LoginRegisterOverlay";
import login, {
    LoginResult
} from "./api-authorization/AuthenticationAndApiAuthorization";

export class Home extends Component {
    static displayName = Home.name;

    state = {
        loginIframeSource: null,
        overlayStyle: "overlay",
        frameStyle: "frame"
    };
    componentDidMount = async () => {
        var result = await login();
        switch (result.status) {
            case LoginResult.Success:
                this.props.history.replace("/dashboard");
                break;
            case LoginResult.Redirect:
                this.setState({
                    loginIframeSource: result.redirectUrl,
                    overlayStyle: "overlay show",
                    frameStyle: "frame show"
                });
                break;
            default:
                console.log(result.message);
                break;
        }
    };
    handleIframeLoaded = async event => {
        if (event.target.name === "register-page") {
            const url = window.frames["register-page"].location.href;
            const urlArray = url.split("/");
            const urlLastIndex = urlArray[urlArray.length - 1];
            if (urlLastIndex !== "Register")
                this.props.history.replace("/dashboard");
        } else {
            const urlPathname = window.frames["login-page"].location.pathname;
            const urlPathnameArray = urlPathname.split("/");
            const urlPathnameFirstIndex = urlPathnameArray[1];
            if (
                urlPathnameFirstIndex !== "Identity" &&
                urlPathnameFirstIndex !== "authentication" &&
                urlPathnameFirstIndex !== "connect"
            ) {
                window.location.href =
                    window.frames["login-page"].location.href;
            }
        }
    };
    render() {
        return (
            <section id="showcase">
                <div className={this.state.overlayStyle}>
                    <div className={this.state.frameStyle}>
                        <LoginRegisterOverlay
                            onIframeLoaded={this.handleIframeLoaded}
                            loginIframeSrc={
                                window.location.search !== ""
                                    ? "/authentication/login" +
                                      window.location.search
                                    : this.state.loginIframeSource
                            }
                        />
                    </div>
                </div>
            </section>
        );
    }
}
