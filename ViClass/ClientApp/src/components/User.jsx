import React, {useState, useEffect, useContext} from "react";
import Navbar from "./Navbar";
import UserImage from "./UserImage";
import UserDetails from "./UserDetails";
import {nameOrEmail} from "./Services/UserObjcetService";
import useGetData from "./Hooks/useGetData";
import AuthenticatedUserContext from "./Context/AuthenticatedUserContext";
import Config from "../config";
import UserContext from "./Context/UserContext";
import UserNameAndFamily from "./UserNameAndFamily";
import ClassTableViewItem from "./ClassTableViewItem";
import ClassTableView from "./ClassTableView";

const userApi = Config.ApiEndpoints.User;
const classesApi = Config.ApiEndpoints.Class;

function User(props) {
    const userId = props.match.params.id;

    const [user, setUser] = useState(null);

    const browserUser = useContext(AuthenticatedUserContext);
    const [userData, userResponseStatus] = useGetData(userApi + userId, undefined, userId);
    const [classes, classesResponseStatus] = useGetData(classesApi + "StudyOrTeaching");

    useEffect(() => {
        if (userResponseStatus === 200 && userData)
            setUser(userData);
    }, [userData, userResponseStatus]);

    const isHimSelf = browserUser && browserUser.sub === userId;

    return (
        <>
            <Navbar/>
            {userResponseStatus === 404 && <p>کاربر وجود ندارد.</p>}
            {user && userResponseStatus === 200 && (
                <UserContext.Provider value={{user, setUser}}>
                    <div className="user">
                        <UserImage imageId={user.imageId} username={nameOrEmail(user)}/>
                        <UserNameAndFamily user={user} isHimSelf={isHimSelf}/>
                        <UserDetails user={user} isHimSelf={isHimSelf}/>
                        {isHimSelf && classesResponseStatus === 200 && <ClassTableView classes={classes}/>}
                    </div>
                </UserContext.Provider>
            )}
        </>
    );
}

export default User;
