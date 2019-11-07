import React from 'react';

function ModalDialog({visible, setVisibility, children}) {
    let mouseDownOnEmptyArea = false;

    const modalDialogClasses = visible
                               ? "modal-dialog visible"
                               : "modal-dialog";

    const onMouseDown = e => {
        mouseDownOnEmptyArea = e.target.id === "modal-dialog-wrapper";
    };
    const onMouseUp = e => {
        mouseDownOnEmptyArea && e.target.id === "modal-dialog-wrapper" && setVisibility(false);
    };

    return (
        <div id="modal-dialog-wrapper"
             className={modalDialogClasses}
             onMouseDown={onMouseDown}
             onMouseUp={onMouseUp}>
            <div className="modal-dialog-content">
                {children}
            </div>
        </div>
    );
}

export default ModalDialog;