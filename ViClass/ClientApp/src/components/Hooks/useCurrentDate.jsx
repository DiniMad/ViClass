import React, {useState, useEffect} from 'react';
import useGetData from "./useGetData";
import Config from "../../config";

const currentDateApi = Config.ApiEndpoints.CurrentDate;

function useCurrentDate() {
    const [currentDate, setCurrentDate] = useState(null);
    const [date, responseStatus] = useGetData(currentDateApi);

    useEffect(() => {
        responseStatus === 200
        ? setCurrentDate(date)
        : setCurrentDate(null);
    }, [date, responseStatus]);

    return [currentDate, setCurrentDate];
}

export default useCurrentDate;