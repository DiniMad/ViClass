import { useState } from "react";
import Http from "../Services/HttpService";

function usePostData(url) {
    const [{ data, status }, setDataAndStatus] = useState({ data: null, status: null });

    const postData = async postObject => {
        if (!postObject) throw 'You should pass a valid object using "setPostObject" function to be post to the API.';
        let responseData, responseStatus;
        try {
            const response = await Http.post(url, postObject);
            responseData = response.data;
            responseStatus = response.status;
        } catch (e) {
            responseData = e.response.data;
            responseStatus = e.response.status;
        }

        setDataAndStatus({ data: responseData, status: responseStatus });
    };

    return { data, responseStatus: status, postData };
}

export default usePostData;
