import React, {useEffect, useState} from 'react';
import ReactCrop from 'react-image-crop';
import {getCroppedImageAsFile, setImageFromFile} from "./Services/ImageService";
import 'react-image-crop/dist/ReactCrop.css';

export default function CropImage(props) {
    // Destructuring properties from props
    const {imageSelectedToCrop, imageSizeAllowedInKB, setModalDialogVisibility, handleSaveNewImage} = props;

    const [imageToCrop, setImageToCrop] = useState(null);
    const [imageCrop, setImageCrop] = useState({width: 200, aspect: 1});
    const [imageTagRef, setImageTagRef] = useState(null);
    const [croppedImageFile, setCroppedImageFile] = useState(null);
    const [allowUpload, setAllowUpload] = useState(false);

    useEffect(() => {
        setImageFromFile(imageSelectedToCrop, setImageToCrop);
    }, []);// Set selected image to crop image source
    useEffect(() => {
        const imageSize = croppedImageFile
                          ? croppedImageFile.size / 1000
                          : null;
        const allow = imageSize && imageSize <= imageSizeAllowedInKB;

        setAllowUpload(allow);
    }, [croppedImageFile]); // Calculate upload permission based on cropped image

    // ReactCrop component events
    const onImageLoaded = async image => setImageTagRef(image);
    const onCropComplete = async crop => {
        if (imageTagRef && crop.height && crop.width) {
            const file = await getCroppedImageAsFile(imageTagRef, crop, "image.jpeg");
            setCroppedImageFile(file);
        }
    };
    const onCropChange = (crop) => setImageCrop(crop);

    const ReactCropSelectionHudComponent = () => {
        const imageSize = croppedImageFile
                          ? croppedImageFile.size / 1000
                          : null;
        const textClasses = allowUpload
                            ? "selection-item text"
                            : "selection-item text red";
        return (
            <>
                <div className={textClasses}><p>{imageSize && imageSize.toFixed(1) + " Kb"}</p></div>
                <button disabled={!allowUpload} className="selection-item button" onClick={handelSaveButton}>ثبت
                </button>
            </>
        );
    }; // A component to render in selection section

    const handelSaveButton = async () => {
        handleSaveNewImage(croppedImageFile); // Call save function of userImage and pass the cropped image to it
        setModalDialogVisibility(false); // Closing the modal dialog
    }; // Handle cropped section save button

    return (imageToCrop && (
            <ReactCrop
                src={imageToCrop}
                crop={imageCrop}
                ruleOfThirds
                onImageLoaded={onImageLoaded}
                onComplete={onCropComplete}
                onChange={onCropChange}
                renderSelectionAddon={ReactCropSelectionHudComponent}
                minWidth={200}
            />
        )
    );
}
