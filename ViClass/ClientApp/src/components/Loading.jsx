import React, {useState} from "react";
import ModalDialog from "./ModalDialog";
import "../styles/loading.scss";

function Loading({displayLoading, setDisplayLoading}) {
    const [displayLoadingAlt, setDisplayLoadingAlt] = useState(true);
    
    return (
        <ModalDialog modalId="loading-modal"
                     visible={displayLoading!==null ?displayLoading: displayLoadingAlt}
                     setVisibility={setDisplayLoading!==null ?setDisplayLoading: setDisplayLoadingAlt}
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