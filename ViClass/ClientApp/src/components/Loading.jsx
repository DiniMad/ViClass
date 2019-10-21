import React, {useEffect} from "react";
import authService from "./api-authorization/AuthorizeService";
import "../styles/loading.css";

function Loading(props) {
    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        authenticateUser();
    });
    const authenticateUser = async () => {
        const url = window.location.href;
        const result = await authService.completeSignIn(url);
        if (result.status !== "success")
            console.log("Error: " + result.message);
    };
    return (
        <div id="loader-wrapper">
            <div id="loader"/>
            <div className="loader-section section-left"/>
            <div className="loader-section section-right"/>
        </div>
    );
}

export default Loading;
