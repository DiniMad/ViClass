import React, {useContext} from "react";
import Navbar from "./Navbar";
import UserImage from "./UserImage";
import UserTextEditButton from "./UserTextEditButton";
import UserDetails from "./UserDetails";
import {nameOrEmail} from "./Services/UserObjcetService";
import {summarizeText} from "./Services/StringService";
import useGetData from "./Hooks/useGetData";
import UserContext from "./Context/UserContext";
import Config from "../config";

const userApi = Config.ApiEndpoints.User;

function User(props) {
    const userId = props.match.params.id;

    const browserUser = useContext(UserContext);
    const {data: user, responseStatus} = useGetData(userApi + userId);

    const isHimSelf = browserUser && browserUser.sub === userId;

    return (
        <>
            <Navbar/>
            {responseStatus === 404 && <p>کاربر وجود ندارد.</p>}
            {responseStatus === 200 && user && (
                <div className="container-percent">
                    <div className="user">
                        <UserImage imageId={user.imageId} username={nameOrEmail(user)}/>
                        <div className='user-name'>
                            <h1>{summarizeText(nameOrEmail(user), 30)}</h1>
                            {isHimSelf && <UserTextEditButton name="username" text={nameOrEmail(user)}/>}
                        </div>
                        <UserDetails user={user} isHimSelf={isHimSelf}/>

                        {isHimSelf && <div className="user-classes">Classes</div>}
                    </div>
                </div>
            )}
        </>
    );
}

export default User;
