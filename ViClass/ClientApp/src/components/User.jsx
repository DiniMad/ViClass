import React, {useState, useEffect, useContext} from "react";
import Navbar from "./Navbar";
import UserImage from "./UserImage";
import UserTextEditButton from "./UserTextEditButton";
import UserDetails from "./UserDetails";
import {nameOrEmail} from "./Services/UserObjcetService";
import {summarizeText} from "./Services/StringService";
import useGetData from "./Hooks/useGetData";
import AuthenticatedUserContext from "./Context/AuthenticatedUserContext";
import Config from "../config";
import UserContext from "./Context/UserContext";
import UserNameAndFamily from "./UserNameAndFamily";

const userApi = Config.ApiEndpoints.User;

function User(props) {
    const userId = props.match.params.id;

    const [user, setUser] = useState(null);

    const browserUser = useContext(AuthenticatedUserContext);
    const [userData, userResponseStatus] = useGetData(userApi + userId, undefined, userId);

    useEffect(() => {
        if (responseStatus === 200 && data)
            setUser(data);
    }, [data, responseStatus]);

    const isHimSelf = browserUser && browserUser.sub === userId;

    return (
        <>
            <Navbar/>
            {responseStatus === 404 && <p>کاربر وجود ندارد.</p>}
            {user && (
                <UserContext.Provider value={{user, setUser}}>
                    <div className="container-percent">
                        <div className="user">
                            <UserImage imageId={user.imageId} username={nameOrEmail(user)}/>
                            <UserNameAndFamily user={user} isHimSelf={isHimSelf}/>
                            <UserDetails user={user} isHimSelf={isHimSelf}/>
                            {isHimSelf && <div className="user-classes">Classes</div>}
                        </div>
                    </div>
                </UserContext.Provider>
            )}
        </>
    );
}

export default User;
