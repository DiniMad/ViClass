import React from 'react';
import UserDetailBox from "./UserDetailBox";
import UserTextEditButton from "./UserTextEditButton";
import MobileIcon from "../image/MobileIcon.svg";
import StudentNumberIcon from "../image/StudentNumberIcon.svg";
import EmailIcon from "../image/EmailIcon.svg";

function UserDetails({user, isHimSelf}) {
    // Destructuring properties from user
    const {
        phoneNumber,
        phoneConfirmed,
        studentNumber,
        studentNumberConfirmed,
        email,
        emailConfirmed
    } = user;

    return (
        <div className='user-detail'>
            <UserDetailBox name="شماره موبایل"
                           title="Mobile Number"
                           text={phoneNumber}
                           icon={MobileIcon}
                           isValidate={phoneConfirmed}
                           isHimSelf={isHimSelf}>
                <UserTextEditButton name="phone" value={phoneNumber}/>
            </UserDetailBox>
            < UserDetailBox name="شماره دانشجویی"
                            title="Student Number"
                            text={studentNumber}
                            icon={StudentNumberIcon}
                            isValidate={studentNumberConfirmed}
                            isHimSelf={isHimSelf}>
                <UserTextEditButton name="StudentNumber" value={studentNumber}/>
            </UserDetailBox>
            <UserDetailBox name="ایمیل"
                           title="Email"
                           text={email}
                           icon={EmailIcon}
                           isValidate={emailConfirmed}
                           isHimSelf={isHimSelf}>
                <UserTextEditButton name="Email" value={email}/>
            </UserDetailBox>
        </div>
    );
}

export default UserDetails;