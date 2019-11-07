import React from 'react';

function Notification({display, textTag, type}) {
    const classes = display
                    ? `notification show ${type}`
                    : "notification";

    return (
        <div className={classes}><p ref={textTag}>اعلان پیام</p></div>
    );
}

export default Notification;