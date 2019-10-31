import React from "react";
import { Link } from "react-router-dom";
import { summarizeText } from "./Services/StringService";

function ClassSharedFiles({ sharedFiles }) {
    return (
        <div className="class-shared-files">
            {sharedFiles &&
            // If there is files but it's empty.
            !sharedFiles[0] ? (
                <p className="class-shared-files-message">منبعی اشتراک گذاری نشده است.</p>
            ) : (
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
        </div>
    );
}

export default ClassSharedFiles;
