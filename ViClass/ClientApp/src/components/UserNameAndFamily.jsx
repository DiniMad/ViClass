import React from 'react';
import {summarizeText} from "./Services/StringService";
import {nameOrEmail} from "./Services/UserObjcetService";
import UserTextEditButton from "./UserTextEditButton";

function UserNameAndFamily({user,isHimSelf}) {
    return (
        <div className='user-name'>
            <h1>{summarizeText(nameOrEmail(user), 30)}</h1>
            {isHimSelf && <UserTextEditButton name="name" value={nameOrEmail(user)}/>}
        </div>
    );
}

export default UserNameAndFamily;