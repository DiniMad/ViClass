import {useState, useEffect} from 'react';
import Http from "../Services/HttpService";

function useGetData(url) {
    const [{data, status}, setDataAndStatus] = useState({data: null, status: null});

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const {data} = await Http.get(url);
            setDataAndStatus({data, status: 200});
        } catch (e) {
            if (e.response && e.response.status === 404)
                setDataAndStatus({data: null, status: 400});
            else
                setDataAndStatus({data: null, status: 600});
        }
    };
    return {data, responseStatus:status};
}

export default useGetData;