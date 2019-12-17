import React, {useEffect} from 'react';
import VideoJS from "video.js";
import Config from "../config";
import "../styles/videojs.css";

const nginxStreamEndPoint = Config.NginXStreamEndPoint;

function LiveVideoStreaming({streamKey}) {
    useEffect(() => {
        if (!streamKey) return;
        
        let player = VideoJS("live-video");
        player.play();
    }, [streamKey]);

    return (
        <>
            {streamKey &&
            <video id="live-video"
                   className="video-js vjs-default-skin"
                   muted="muted"
                   crossOrigin="anonymous"
                   controls>
                <source src={`${nginxStreamEndPoint}${streamKey}.m3u8`}
                        type="application/x-mpegURL"/>
            </video>}
        </>);
}

export default LiveVideoStreaming;