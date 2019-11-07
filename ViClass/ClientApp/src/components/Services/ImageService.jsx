import {dataURLtoFile} from "./FileService";

// A function to convert fetched image object to actual image
export const getImageFromBase64 = (image) => `data:image/${image.extension}jpg;base64,${image.data}`;

export const setImageFromFile = (image, setImage) => {

    const fileReader = new FileReader();
    fileReader.onload = function (e) {
        setImage(e.target.result);
    };

    fileReader.readAsDataURL(image);
};

export const getCroppedImageAsFile = async (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const canvasContext = canvas.getContext('2d');

    canvasContext.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
    );
    const canvasImage = await canvas.toDataURL('image/jpeg');
    return dataURLtoFile(canvasImage, fileName);
};
