import React from "react";
import UserProfileImage from "../image/UserProfileImage.svg";
import {Link} from "react-router-dom";
import {summarizeText} from "./Services/StringService";
import {nameOrEmail} from "./Services/UserObjcetService";
import {getImageFromBase64} from "./Services/ImageService";
import useGetData from "./Hooks/useGetData";
import Config from "../config";

const imageApi = Config.ApiEndpoints.File;

function ClassInstructor({instructor}) {
    // Destructuring properties from instructor
    const {id, imageId} = instructor;

    const {data: image, responseStatus: imageStatus} = useGetData(imageApi + imageId, !!imageId);

    return (
        <div className="class-instructor">
            <img
                src={imageStatus === 200
                     ? getImageFromBase64(image)
                     : UserProfileImage}
                alt={image
                     ? `${nameOrEmail(instructor)} profile image.`
                     : "Default profile image."}
            />
            <Link to={`/user/${id}`}>
                <h3>{summarizeText(nameOrEmail(instructor), 20)}</h3>
            </Link>
        </div>
    );
}

export default ClassInstructor;
