import React from 'react';
import EditIcon from "../image/EditIcon.svg"

function UserTextEditButton({name, text}) {
    // Adding "name" class to component classes if its username edit button
    const classes = name === "username"
                    ? "user-text-edit-button name"
                    : "user-text-edit-button";
    const handleEditButton = () => {
        // TODO: Update value using "name" and "text" properties
    };

    return (
        <div className={classes}>
            <button onClick={handleEditButton}><img src={EditIcon} alt="Edit icon"/></button>
        </div>
    );
}

export default UserTextEditButton;