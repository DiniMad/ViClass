import React from 'react';

function ModalDialog({visible, setVisibility, children, canCloseModal = true, modalId}) {
    let mouseDownOnEmptyArea = false;

    const modalDialogClasses = visible
                               ? "modal-dialog visible"
                               : "modal-dialog";

    const onMouseDown = e => {
        if (canCloseModal)
            mouseDownOnEmptyArea = e.target.id === "modal-dialog-wrapper";
    };
    const onMouseUp = e => {
        if (mouseDownOnEmptyArea && e.target.id === "modal-dialog-wrapper")
            setVisibility(false);
    };

    return (
        <div id={modalId || null}
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