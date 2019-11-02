import React from "react";
import Config from "../config";
import useGetData from "./Hooks/useGetData";
import Navbar from "./Navbar";

const userApi = Config.ApiEndpoints.User;

function User(props) {
    const userId = props.match.params.id;

    const { data: user, responseStatus } = useGetData(userApi + userId);

    return (
        <>
            <Navbar />
            {responseStatus === 404 && <p>کاربر وجود ندارد.</p>}
            {responseStatus === 200 && user && <div>{user.userName}</div>}
        </>
    );
}

export default User;
