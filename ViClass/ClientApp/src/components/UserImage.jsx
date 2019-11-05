import React, {useState, useEffect, useRef} from 'react';
import UserProfileImage from "../image/UserProfileImage.svg";
import EditIcon from "../image/EditIcon.svg";
import usePostData from "./Hooks/usePostData";
import Config from "../config"
import useGetData from "./Hooks/useGetData";
import {getImageFromBase64} from "./Services/ImageService";

const imageApi = Config.ApiEndpoints.File;

function UserImage({imageId, username}) {

    const imageTag = useRef(null);
    const imageInput = useRef(null);
    const [image, setImage] = useState(UserProfileImage);
    // A property to revert image if is needed
    const [previousImage, setPreviousImage] = useState(null);
    // A hook to post image to API
    const {data: postData, responseStatus: postResponseStatus, post} = usePostData(`${imageApi}ProfileImage`);
    // Get user image if imageId is not null
    const {data: fetchedImage, responseStatus: fetchedImageStatus} = useGetData(imageApi + imageId, !!imageId);
    // Update UI image on user image received from API
    useEffect(() => {
        if (fetchedImageStatus === 200)
            setImage(getImageFromBase64(fetchedImage))
    }, [fetchedImageStatus]);
    // Revert UI image update changes if posting image get wrong
    useEffect(() => {
        // Something went wrong in uploading new image 
        if (postResponseStatus !== 200 && previousImage) {
            setImage(previousImage);
            // TODO: Display a notification to say something went wrong
        }
    }, [postResponseStatus, postData]);


    const handleEditImageButton = () => {
        // TODO: Implement an attractive image input using https://www.npmjs.com/package/react-image-crop instead
        imageInput.current.click();
    };
    const handleImageInputChange = async () => {
        if (!imageInput.current) return;
        const image = imageInput.current.files[0];
        // No file is selected.
        if (!image) {
            console.error("Select an image.");
            return;
        }
        setPreviousImage(imageTag.current.src);
        // Update UI (Change profile image)
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            setImage(e.target.result);
        };
        fileReader.readAsDataURL(image);
        // Post new image to API.
        const formData = new FormData();
        formData.append("file", image);
        await post(formData);
    };

    return (
        <div className='user-image'>
            <div className='user-image-template'>
                <img ref={imageTag}
                     src={image}
                     alt={fetchedImageStatus === 200
                          ? `${username} profile image.`
                          : "Default user profile image."}/>
                <button
                    className='user-image-template-edit-button'
                    onClick={handleEditImageButton}
                >
                    <img src={EditIcon} alt="Edit icon"/>
                    <input ref={imageInput}
                           onChange={handleImageInputChange}
                           type="file"
                           accept=".png,.jpg,.jpeg"/>
                </button>
            </div>
        </div>
    );
}

export default UserImage;