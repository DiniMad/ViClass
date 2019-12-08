import React from 'react';
import Navbar from "./Navbar";
import LiveChat from "./LiveChat";

function LiveClass(props) {
    return (
        <>
            <Navbar/>
            {/*{userResponseStatus === 404 && <p>کاربر وجود ندارد.</p>}*/}
            {/*{user && userResponseStatus === 200 && (*/}
            <LiveChat/>
        </>
    );
}

export default LiveClass;