import {useState, useEffect} from "react";
import authService from "../api-authorization/AuthorizeService";

function useAuthenticateUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        setUser(await authService.getUser());
    };
    return user;
}

export default useAuthenticateUser;
