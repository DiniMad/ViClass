import React, {useState, useEffect} from "react";
import {LoginRegisterOverlay} from "./LoginRegisterOverlay";
import login, {
    LoginResult
} from "./api-authorization/AuthenticationAndApiAuthorization";


function Home(props) {
    const [loginIframeSource, setLoginIframeSource] = useState(null);
    const [overlayStyle, setOverlayStyle] = useState("overlay");
    const [frameStyle, setFrameStyle] = useState("frame");

    useEffect(() => {
        authenticateUser();
    }, []);
    
    const authenticateUser = async () => {
        const result = await login();
        switch (result.status) {
            case LoginResult.Success:
                props.history.replace("/dashboard");
                break;
            case LoginResult.Redirect:
                setLoginIframeSource(result.redirectUrl);
                setOverlayStyle("overlay show");
                setFrameStyle("frame show");
                break;
            default:
                console.log(result.message);
                break;
        }
    };

    const handleIframeLoaded = async event => {
        if (event.target.name === "register-page") {
            const url = window.frames["register-page"].location.href;
            const urlArray = url.split("/");
            const urlLastIndex = urlArray[urlArray.length - 1];
            if (urlLastIndex !== "Register")
                props.history.replace("/dashboard");
        }
        else {
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

    return (
        <section id="showcase">
            <div className={overlayStyle}>
                <div className={frameStyle}>
                    <LoginRegisterOverlay
                        onIframeLoaded={handleIframeLoaded}
                        loginIframeSrc={
                            window.location.search !== ""
                            ? "/authentication/login" +
                                window.location.search
                            : loginIframeSource
                        }
                    />
                </div>
            </div>
        </section>
    );
}

export default Home;

