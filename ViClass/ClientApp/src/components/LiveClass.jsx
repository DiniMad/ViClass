import React, {useState, useEffect, useContext} from 'react';
import Navbar from "./Navbar";
import LiveChat from "./LiveChat";
import LiveVideoStreaming from "./LiveVideoStreaming";
import LiveInstructorGuide from "./LiveInstructorGuide";
import usePutData from "./Hooks/usePutData";
import useGetData from "./Hooks/useGetData";
import AuthenticatedUserContext from "./Context/AuthenticatedUserContext";
import NotificationContext from "./Context/NotificationContext";
import Config from "../config";

const classApi = Config.ApiEndpoints.Class;

function LiveClass(props) {
    const classId = props.match.params.id;
    const classTitle = props.match.params.title;
    const instructorId = props.match.params.instructorId;

    const [isItViewer, setIsItViewer] = useState(null);
    const [streamKey, setStreamKey] = useState(null);

    const user = useContext(AuthenticatedUserContext);
    const displayNotification = useContext(NotificationContext);

    const [dataSetStreamKey, statusSetStreamKey, put] = usePutData(`${classApi}stream/${classId}`);
    const [dataGetClass, setDataGetClass] = useGetData(classApi + classId, (user && user.sub !== instructorId));

    useEffect(() => {
        if (!dataSetStreamKey) return;

        if (statusSetStreamKey === 200) {
            if (dataSetStreamKey.started) setStreamKey(dataSetStreamKey.data);
            else window.location.replace(`/class/${classId}`);
        }
        else displayNotification("یک خطای غیر منتظره رخ داده است.", 5, "warning");

    }, [dataSetStreamKey, statusSetStreamKey]);// On set new stream key response receive
    useEffect(() => {
        if (!dataGetClass) return;
        if (setDataGetClass === 200) setStreamKey(dataGetClass.streamKey);
    }, [dataGetClass, setDataGetClass]); // On get class response receives
    useEffect(() => {
        if (!user) return;

        if (user.sub === instructorId) {
            setIsItViewer(false);
            put({isStreamStarted: true});
        }
        else {
            setIsItViewer(true);
        }
    }, [user]); // On user value changed (component did mount)

    const handelStopStreamButton = () => put({isStreamStarted: false});

    return (
        <>
            <Navbar/>
            <div id="live">
                <LiveChat/>
                <div id="live-streaming-video">
                    <div id="live-streaming-video-header"><h1>{classTitle}</h1></div>
                    {isItViewer === true && <LiveVideoStreaming streamKey={streamKey}/>}
                    {isItViewer === false &&
                    <LiveInstructorGuide streamKey={streamKey} stopSteamButton={handelStopStreamButton}/>}
                </div>
            </div>
        </>
    );
}

export default LiveClass;