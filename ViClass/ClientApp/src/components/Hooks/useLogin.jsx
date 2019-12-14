import React, {useContext, useEffect} from 'react';
import usePostData from "./usePostData";
import {clientSignIn} from "../Services/AuthenticationService";
import NotificationContext from "../Context/NotificationContext";
import Config from "../../config"

const authenticationApi = Config.ApiEndpoints.Authentication;

function useLogin(onLoginResponseReceiveCallback) {

    const [data, status, post] = usePostData(authenticationApi + "login");

    const displayNotification = useContext(NotificationContext);

    useEffect(() => {
        if (!data) return;
        onLoginResponseReceiveCallback(status);
        if (status === 200)
            clientSignIn();
        else if (status === 400)
            displayNotification("شماره دانشجویی یا رمز عبور اشتباه است.", 5, "warning");
        else
            displayNotification("مشکلی در ورود رخ داده است.", 5, "warning");
    }, [data, status]);

    return loginModel => {
        post(loginModel);
    };
}

export default useLogin;