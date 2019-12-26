import React, {useState, useEffect, useContext, useRef} from 'react';
import ResumeAbleJs from "resumablejs";
import ModalDialog from "./ModalDialog";
import {summarizeText} from "./Services/StringService";
import Http from "./Services/HttpService";
import NotificationContext from "./Context/NotificationContext";
import PlusIcon from "../image/PlusIcon.svg"
import Config from "../config";

const fileApi = Config.ApiEndpoints.File;
const mbUnit = Config.Units.MB;
const videoMaxSizeInMg = Config.FileMaxSizeInMg.ClassVideo;

function UploadVideo({classId, setDataDependency}) {
    const [resume, setResume] = useState(null);
    const [resumeIsSupported, setResumeIsSupported] = useState(true);
    const [uploadModalDisplay, setUploadModalDisplay] = useState(false);
    const [pauseUpload, setPauseUpload] = useState(false);
    const [pauseResumeButtonText, setPauseResumeButtonText] = useState("توقف");
    const [uploadIsFinished, setUploadIsFinished] = useState(false);

    const selectButton = useRef(null);
    const progressBarPointer = useRef(null);
    const progressBarText = useRef(null);

    const displayNotification = useContext(NotificationContext);

    useEffect(() => {
        if (!resume) return;

        let sessionId = null;

        if (!resume.support) {
            // Inform user that resume dose not support
            setResumeIsSupported(false);
        }
        else {
            resume.assignBrowse(selectButton.current);

            resume.on('fileAdded', async (file) => {
                if(file.size>videoMaxSizeInMg*mbUnit){
                    displayNotification(`حداکثر حجم فایل ${videoMaxSizeInMg} مِگ است.`, 5);
                    resume.removeFile(file);
                    return; 
                }

                setUploadModalDisplay(true);

                const formData = new FormData();
                formData.append("chunkSize", resume.opts.chunkSize);
                formData.append("totalSize", file.size);
                formData.append("fileName", file.fileName);

                Http.post(fileApi + "video/create/", formData)
                    .then(response => {
                        let data = response.data;
                        sessionId = data.sessionId;
                        resume.opts.sessionId = sessionId;
                        resume.opts.target = `${fileApi}video/upload/user/${data.userId}/session/${sessionId}`;
                        resume.upload();
                    })
                    .catch(e => {
                        console.error(e);
                        displayNotification("مشکلی در آپلود فایل بوجود آمده است.", 5, "warning");
                        setUploadModalDisplay(false);
                    });
            });
            resume.on('complete', () => {
                setUploadIsFinished(true);
                setUploadModalDisplay(false);
            });
            resume.on('fileSuccess', function (file, message) {
                setUploadIsFinished(true);

                const formData = new FormData();
                formData.append("classId", classId);
                formData.append("sessionId", sessionId);
                formData.append("fileName", file.fileName);
                formData.append("totalSize", file.size);

                Http.post(fileApi + 'video/completed/', formData).then(response => {
                    displayNotification("ویدیو با موفقیت آپلود شد.", 5, "success");
                    setDataDependency(response.data);
                }).catch(e => {
                    console.error(e);
                    displayNotification("مشکلی در آپلود فایل بوجود آمده است.", 5, "warning");
                    setUploadModalDisplay(false);
                });
            });
            resume.on('fileProgress', function (file) {
                let percentage = Math.floor(file.progress() * 100) + '%';
                progressBarPointer.current.style.width = percentage;
                progressBarText.current.innerText = percentage;
            });
            resume.on('cancel', function () {
                const formData = new FormData();
                formData.append("sessionId", sessionId);

                Http.post(fileApi + 'video/cancel/', formData).catch(e => {
                    console.error(e);
                });
            });
            resume.on('uploadStart', function () {
            });
        }
    }, [resume]);
    useEffect(() => {
        if (!selectButton.current) return;

        setResume(new ResumeAbleJs({
                                       target: `${fileApi}video/create`,
                                       chunkSize: 1024 * 1024,
                                       fileType: ['mp4', 'mkv'],
                                       forceChunkSize: true,
                                       simultaneousUploads: 1,
                                       uploadMethod: 'PUT',
                                       testChunks: false,
                                       throttleProgressCallbacks: 1,
                                       fileParameterName: 'file',
                                       chunkNumberParameterName: 'chunkNumber',
                                       chunkSizeParameterName: 'chunkSize',
                                       currentChunkSizeParameterName: 'chunkSize',
                                       fileNameParameterName: 'fileName',
                                       totalSizeParameterName: 'totalSize'
                                   }));
    }, [selectButton]); // Initiate resume object
    useEffect(() => {
        if (!resume) return;

        setPauseResumeButtonText(pauseUpload
                                 ? "ادامه"
                                 : "توقف");

        if (pauseUpload) resume.pause();
        else resume.upload();
    }, [pauseUpload]);
    useEffect(() => {
        if (uploadModalDisplay) return;
        progressBarPointer.current.style.width = "0%";
        progressBarText.current.innerText = "0%";
        setUploadIsFinished(false);
    }, [uploadModalDisplay]);

    const pauseOrResumeUpload = () => !uploadIsFinished && setPauseUpload(preValue => !preValue);
    const cancelUpload = () => {
        if (uploadIsFinished) return;
        resume.cancel();
        setUploadModalDisplay(false);
    };
    const handleAddButtonClick = () => {
        if (!resumeIsSupported) displayNotification("مرورگر شما تکنولوژی مورد نیاز را پشتیبانی نمی کند.", 5, "warning");
    };


    return (
        <div className="class-videos-new">
            <button ref={selectButton} className="add-button" onClick={handleAddButtonClick}>
                <img src={PlusIcon} alt="Add"/>
            </button>
            <ModalDialog visible={uploadModalDisplay} setVisibility={setUploadModalDisplay} canCloseModal={false}>
                <div className="class-videos-new-upload-popup">
                    <div className="title">
                        <h3>{summarizeText("This is a fucking title of the vide uploadiong", 100)}</h3>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-bar-background">
                            <div ref={progressBarPointer} className="progress-bar-pointer" style={{width: "10%"}}/>
                            <div>
                                <p ref={progressBarText} className="progress-bar-text">0%</p>
                            </div>
                        </div>
                    </div>
                    {!uploadIsFinished &&
                    <div className="buttons">
                        <button className="pause-resume" onClick={pauseOrResumeUpload}>
                            {pauseResumeButtonText}
                        </button>
                        <button className="cancel" onClick={cancelUpload}>لغو</button>
                    </div>
                    }
                </div>
            </ModalDialog>
        </div>
    );
}

export default UploadVideo;