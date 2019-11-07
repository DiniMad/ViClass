export const dataURLtoFile = (dataUrl, filename) => {
    let dataUrlArray = dataUrl.split(','),
        mime = dataUrlArray[0].match(/:(.*?);/)[1],
        dataContent = atob(dataUrlArray[1]),
        n = dataContent.length,
        unit8Array = new Uint8Array(n);

    while (n--) {
        unit8Array[n] = dataContent.charCodeAt(n);
    }
    return new File([unit8Array], filename, {type: mime});
};
