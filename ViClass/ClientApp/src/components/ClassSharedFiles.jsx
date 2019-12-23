import React, {useEffect, useRef, useContext} from "react";
import {Link} from "react-router-dom";
import usePostData from "./Hooks/usePostData";
import {summarizeText} from "./Services/StringService";
import NotificationContext from "./Context/NotificationContext";
import PlusIcon from "../image/PlusIcon.svg";
import Config from "../config";

const sharedFilesApi = Config.ApiEndpoints.File + "SharedFiles/";
const mb = Config.Units.MB;
const sharedFileMaxAllowedSize = 10 * mb;

function ClassSharedFiles({sharedFiles, relationWithUser, classId, setDataDependency}) {
    const inputFile = useRef(null);

    const displayNotification = useContext(NotificationContext);

    const [postData, postResponseStatus, post] = usePostData(sharedFilesApi);

    useEffect(() => {
        if (!postData) return;
        if (postResponseStatus === 200) {
            displayNotification("با موفقیت آپلود شد.", 5, "success");
            setDataDependency(postData);
        }
        else displayNotification("مشکلی در آپلود فایل رخ داده است.", 5, "warning");
    }, [postData, postResponseStatus]);

    const handleAddButtonClick = () => {
        if (inputFile) inputFile.current.click();
    };
    const handleFileInputChange = () => {
        const input = inputFile.current;
        if (!input || input.files.length === 0) return;
        if (input.files[0].size > sharedFileMaxAllowedSize) {
            displayNotification(`حداکثر حجم فایل ${sharedFileMaxAllowedSize / mb} مِگ است.`, 5, "warning");
            return;
        }

        const formData = new FormData();
        formData.append("classId", classId);
        formData.append("file", input.files[0]);
        post(formData);

        input.value = ""; // Clean input file
    };

    return (
        <div className="class-shared-files">
            {sharedFiles &&
             // If there is files but it's empty.
             !sharedFiles[0]
             ? (
                 <p className="class-shared-files-message">منبعی اشتراک گذاری نشده است.</p>
             )
             : (
                 // Otherwise render files
                 <>
                     <h3 className="class-shared-files-title">منابع</h3>
                     <div className="class-shared-files-items">
                         {sharedFiles.map(
                             sf =>
                                 sf && (
                                     <Link key={sf.id} to={`/files/${sf.id}`}>
                                         <p>{summarizeText(sf.description, 64)}</p>
                                         <p>{sf.volumeInMg} mg</p>
                                     </Link>
                                 )
                         )}
                     </div>
                 </>
             )}
            {relationWithUser === 2 &&
            (<>
                <button className="add-button" onClick={handleAddButtonClick}>
                    <img src={PlusIcon} alt="Add"/>
                </button>
                <input ref={inputFile}
                       type="file"
                       className="display-none"
                       onChange={handleFileInputChange}
                       accept=".rar,.zip"/>
            </>)}
        </div>
    );
}

export default ClassSharedFiles;
