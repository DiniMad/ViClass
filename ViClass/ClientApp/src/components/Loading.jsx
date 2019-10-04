import React, { Component } from "react";
import authService from "./api-authorization/AuthorizeService";
import "../styles/loading.css";

class Loading extends Component {
    componentDidUpdate = async () => {
        const url = window.location.href;
        const result = await authService.completeSignIn(url);
        if (result.status !== "success")
            console.log("Error: " + result.message);
    };
    render() {
        return (
            <div id="loader-wrapper">
                <div id="loader"></div>

                <div className="loader-section section-left"></div>
                <div className="loader-section section-right"></div>
            </div>
        );
    }
}
export default Loading;
