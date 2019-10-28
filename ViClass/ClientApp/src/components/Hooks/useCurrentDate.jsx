import { useState, useEffect } from "react";
import Http from "../Services/HttpService";
import Config from "../../config.json";

const currentDateApi = Config.ApiEndpoints.CurrentDate;

function useCurrentDate() {
    const [currentDate, setCurrentDate] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const date = (await Http.get(currentDateApi)).data;
        setCurrentDate(date);
    };

    return currentDate;
}

export default useCurrentDate;
