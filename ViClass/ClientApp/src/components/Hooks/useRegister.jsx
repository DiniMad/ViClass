import React,{useEffect} from 'react';
import usePostData from "./usePostData";
import {clientSignIn} from "../Services/AuthenticationService";
import Config from "../../config";

const authenticationApi = Config.ApiEndpoints.Authentication;

function useRegister(onResponseReceiveCallback) {
    const [data, status, post] = usePostData(authenticationApi + "register");

    useEffect(() => {
        if (!data) return;
        onResponseReceiveCallback(data.errors);
        if (status === 200)
            clientSignIn();
    }, [data, status]);

    return registerModel => {
        post(registerModel);
    };
}

export default useRegister;