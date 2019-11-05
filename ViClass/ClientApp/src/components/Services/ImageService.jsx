// A function to convert fetched image object to actual image
export const getImageFromBase64 = (image) => `data:image/${image.extension}jpg;base64,${image.data}`;