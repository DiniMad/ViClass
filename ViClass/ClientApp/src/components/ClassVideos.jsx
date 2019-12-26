import React, { useEffect, useRef} from "react";
import UploadVideo from "./UploadVideo";
import {summarizeText} from "./Services/StringService";
import Config from "../config";

const downloadVideoApi = Config.ApiEndpoints.File + "video/download/";
const mbUnit = Config.Units.MB;

function ClassVideos({shouldPresentVideo, videos, classId, relationWithUser, setDataDependency}) {
    const videosWrapper = useRef(null);

    useEffect(() => {
        const messageBody = videosWrapper.current;
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }, [videos]);

    return (
        <div className="class-videos">
            {// If should not present the videos
                !shouldPresentVideo
                ? (<p className="class-videos-message">ویدئوهای این درس ارائه نمیشوند</p>)
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
                        <div ref={videosWrapper} className="class-videos-items">
                            {videos.map(
                                v =>
                                    v &&
                                    (<a key={v.id} href={downloadVideoApi + v.savedName}>
                                        <p>{summarizeText(v.description.replace(/(.mp4)|(.mkv)$/, ''), 90)}</p>
                                        <p>{(v.volumeInMg / mbUnit).toFixed(1)} mg</p>
                                    </a>)
                            )}
                        </div>
                    </>
                )}
            {(shouldPresentVideo && relationWithUser === 2) &&
            (<UploadVideo classId={classId} setDataDependency={setDataDependency}/>)}
        </div>
    );
}

export default ClassVideos;
