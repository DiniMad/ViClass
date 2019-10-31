import React from "react";

function ClassSubscribeButton({ classId, relationWithUser }) {
    const handleSubscribeButton = () => {
        // TODO: Invert the subscription and send it to API (use a confirmation modal dialog for unsubscribe)
    };

    // Is he/she the instructor of class
    if (relationWithUser === 2) return <></>;
    return (
        <button className="class-subscribe-button" onClick={handleSubscribeButton}>
            <div className={"class-subscribe-button-content " + (relationWithUser === 0 ? "sub" : "unsub")}>
                <div>+</div>
            </div>
        </button>
    );
}

export default ClassSubscribeButton;
