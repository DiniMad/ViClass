import { useState, useEffect } from "react";
import authService from "../api-authorization/AuthorizeService";

function useAuthenticateUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const user = await authService.getUser();
        setUser(user);
    };
    return user;
}

export default useAuthenticateUser;
