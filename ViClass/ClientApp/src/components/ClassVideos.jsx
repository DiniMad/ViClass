import React from "react";
import { Link } from "react-router-dom";
import { summarizeText } from "./Services/StringService";

function ClassVideos({ shouldPresentVideo, videos }) {
    return (
        <div className="class-videos">
            {// If should not present the videos
            !shouldPresentVideo ? (
                <p className="class-videos-message">ویدئوهای این درس ارائه نمیشوند</p>
            ) : // Otherwise check to make sure it is not Null
            videos &&
              // If there is video but it's empty.
              !videos[0] ? (
                <p className="class-videos-message">ویدئویی وجود ندارد</p>
            ) : (
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
                                            {summarizeText(
                                                v.description +
                                                    v.description +
                                                    v.description +
                                                    v.description +
                                                    v.description,
                                                64
                                            )}
                                        </p>
                                        <p>{v.volumeInMg}mg</p>
                                    </Link>
                                )
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default ClassVideos;
