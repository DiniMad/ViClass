import { useState, useEffect } from "react";
import Http from "../Services/HttpService";

function useGetData(url) {
    const [{ data, status }, setDataAndStatus] = useState({ data: null, status: null });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let responseData, responseStatus;
        try {
            const response = await Http.get(url);
            responseData = response.data;
            responseStatus = response.status;
        } catch (e) {
            responseData = e.response.data;
            responseStatus = e.response.status;
        }

        setDataAndStatus({ data: responseData, status: responseStatus });
    };
    return { data, responseStatus: status };
}

export default useGetData;
