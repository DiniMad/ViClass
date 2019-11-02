import React from "react";
import UserProfileImage from "../image/UserProfileImage.svg";
import { Link } from "react-router-dom";
import { summarizeText } from "./Services/StringService";

function ClassInstructor({ instructor }) {
    // Destructuring properties from instructor
    const { id, userName, image } = instructor;

    return (
        <div className="class-instructor">
            <img
                src={image || UserProfileImage}
                alt={image ? `${userName} image profile.` : "Default user profile image."}
            />
            <Link to={`/user/${id}`}>
                <h3>{summarizeText(userName, 20)}</h3>
            </Link>
        </div>
    );
}

export default ClassInstructor;
