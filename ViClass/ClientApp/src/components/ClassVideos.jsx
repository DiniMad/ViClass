import React, {useState, useEffect, useRef, useContext} from "react";
import {Link} from "react-router-dom";
import {summarizeText} from "./Services/StringService";
import PlusIcon from "../image/PlusIcon.svg"
import usePostData from "./Hooks/usePostData";
import Config from "../config";
import NotificationContext from "./Context/NotificationContext";

const videoApi = Config.ApiEndpoints.File + "ClassVideo/";

function ClassVideos({shouldPresentVideo, videos, classId, relationWithUser}) {
    const inputFile = useRef(null);
    const displayNotification = useContext(NotificationContext);

    const [postData, postResponseStatus, post] = usePostData(videoApi);

    useEffect(() => {
        if (!postData) return;
        if (postResponseStatus === 200) {
            console.log(postData);
            console.log(postResponseStatus);
        }
        else displayNotification("مشکلی در آپلود ویدیو رخ داده است.", 5, "warning")
    }, [postData, postResponseStatus]);

    const handleAddButtonClick = () => {
        if (inputFile) inputFile.current.click();
    };
    const handleFileInputChange = () => {
        const input = inputFile.current;
        if (!input || input.files.length === 0) return;

        const formData = new FormData();
        formData.append("classId", classId);
        formData.append("file", input.files[0]);
        post(formData);

        input.value = ""; // Clean input file
    };

    return (
        <div className="class-videos">
            {// If should not present the videos
                !shouldPresentVideo
                ? (
                    <p className="class-videos-message">ویدئوهای این درس ارائه نمیشوند</p>
                )
                : // Otherwise check to make sure it is not Null
                videos &&
                // If there is video but it's empty.
                !videos[0]
                ? (
                    <p className="class-videos-message">ویدئویی وجود ندارد</p>
                )
                : (
                    // Otherwise render videos
                    <>
                        <h3 className="class-videos-title">ویدئو جلسات</h3>
                        <div className="class-videos-items">
                            {videos.map(
                                v =>
                                    v && (
                                        <Link key={v.id} to={`/video/${v.id}`}>
                                            <p>
                                                [{v.lengthFormatted}]&#8195;
                                                {summarizeText(v.description, 64)}
                                            </p>
                                            <p>{v.volumeInMg}mg</p>
                                        </Link>
                                    )
                            )}
                        </div>
                    </>
                )}
            {(shouldPresentVideo && relationWithUser === 2) &&
            (<>
                <button className="add-button" onClick={handleAddButtonClick}>
                    <img src={PlusIcon} alt="Add"/>
                </button>
                <input ref={inputFile}
                       type="file"
                       className="display-none"
                       onChange={handleFileInputChange}
                       accept=".mp4,.mkv"/>
            </>)}
        </div>
    );
}

export default ClassVideos;
