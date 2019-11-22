import {useState} from 'react';
import Http from "../Services/HttpService";

function usePutData(url) {
    const [{data, status}, setDataAndStatus] = useState({data: null, status: null});

    const put = async (object) => {
        if (!object) throw 'You should pass a valid object using "setPostObject" function to be post to the API.';
        
        let responseData, responseStatus;
        try {
            const response = await Http.put(url, object);
            responseData = response.data;
            responseStatus = response.status;
        } catch (e) {
            responseData = e.response.data;
            responseStatus = e.response.status;
        }

        setDataAndStatus({data: responseData, status: responseStatus});
    };

    return [data, status, put];
}

export default usePutData;