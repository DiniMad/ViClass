import React, {useState, useEffect, useRef, useContext} from 'react';
import ModalDialog from "./ModalDialog";
import CropImage from "./CropImage";
import {getImageFromBase64} from "./Services/ImageService";
import useGetData from "./Hooks/useGetData";
import usePostData from "./Hooks/usePostData";
import NotificationContext from "./Context/NotificationContext";
import UserProfileImage from "../image/UserProfileImage.svg";
import EditIcon from "../image/EditIcon.svg";
import Config from "../config"

const imageApi = Config.ApiEndpoints.File + "ProfileImage/";
const imageSizeAllowedInKB = 300;

function UserImage({imageId, username}) {

    const imageInput = useRef(null);
    const [image, setImage] = useState(UserProfileImage);
    const [displayCropModal, setDisplayCropModal] = useState(false);
    const [newSelectedImage, setNewSelectedImage] = useState(false);
    const [previousImage, setPreviousImage] = useState(null); // In case needed to revert image

    const displayNotification = useContext(NotificationContext);

    const [postData, postResponseStatus, post] = usePostData(imageApi);
    // Get user image if imageId is not null
    const [fetchedImage, imageStatus] = useGetData(imageApi + imageId, !!imageId, imageId);

    useEffect(() => {
        if (!imageId && image !== UserProfileImage) setImage(UserProfileImage);
        else if (imageStatus === 200)
            setImage(getImageFromBase64(fetchedImage))
    }, [imageStatus, imageId]);// Update UI image on imageId or API response changed
    useEffect(() => {
        if (!postResponseStatus) return;
        if (postResponseStatus === 200)
            displayNotification("عکس با موفقیت بارگذاری شد.", 5, "success");
        else if (previousImage) { // Something went wrong in uploading new image 
            setImage(previousImage);
            displayNotification("مشکلی در بارگذاری فایل رخ داده است.", 5, "warning");
        }
    }, [postResponseStatus, postData]); // Revert UI image if upload new image failed

    const handleEditImageButton = () => {
        imageInput.current.click();
    };
    const handleImageInputChange = async () => {
        if (!imageInput.current || imageInput.current.files.length === 0) return;
        setNewSelectedImage(imageInput.current.files[0]); // Set selected image to a property
        imageInput.current.value = ""; // Clean input file
        setDisplayCropModal(true); // Display crop modal
    };
    const handleSaveNewImage = async (newImage) => {
        // Keep previous image in case something went wrong through uploading new image
        setPreviousImage(image);

        // Set UI user image to new image (this change will invert if something went wrong in upload process)
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            setImage(e.target.result);
        };
        fileReader.readAsDataURL(newImage);

        // Post new image to API
        const formData = new FormData();
        formData.append("file", newImage);
        post(formData);
    };

    return (
        <div className='user-image'>
            <div className='user-image-template'>
                <img src={image}
                     alt={imageStatus === 200
                          ? `${username} profile image.`
                          : "Default user profile image."}/>
                <button className='user-image-template-edit-button' onClick={handleEditImageButton}>
                    <img src={EditIcon} alt="Edit icon"/>
                    <input ref={imageInput}
                           onChange={handleImageInputChange}
                           type="file"
                           accept=".png,.jpg,.jpeg"/>
                </button>
            </div>
            {newSelectedImage &&
            <ModalDialog visible={displayCropModal} setVisibility={setDisplayCropModal}>
                <div className="user-image-crop-title">
                    <p>حداکثر حجم مجاز {imageSizeAllowedInKB} کیلوبایت هست.</p>
                </div>
                {displayCropModal && (<CropImage imageSelectedToCrop={newSelectedImage}
                                                 imageSizeAllowedInKB={imageSizeAllowedInKB}
                                                 setModalDialogVisibility={setDisplayCropModal}
                                                 handleSaveNewImage={handleSaveNewImage}/>
                )}
            </ModalDialog>}
        </div>
    );
}

export default UserImage;