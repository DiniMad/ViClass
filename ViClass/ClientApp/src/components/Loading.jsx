import React from "react";
import ModalDialog from "./ModalDialog";
import "../styles/loading.scss";

function Loading({displayLoading, setDisplayLoading}) {
    return (
        <ModalDialog modalId="loading-modal"
                     visible={displayLoading}
                     setVisibility={setDisplayLoading}
                     canCloseModal={false}>
            <div className="loading">
                <div className="loading-wrapper">
                    <div className="loading-spinner">
                        <div/>
                    </div>
                </div>
            </div>
        </ModalDialog>
    );
}

export default Loading;