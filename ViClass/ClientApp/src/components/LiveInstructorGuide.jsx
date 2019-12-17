import React from 'react';

function LiveInstructorGuide({streamKey, stopSteamButton}) {
    const OnVarTagClicked = e => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(e.target);
        selection.removeAllRanges();
        selection.addRange(range);
    };

    return (
        <div id="live-streaming-video-instructor-guid">
            <div className="setup">
                <h3>در برنامه OBS وارد Settings شده و در تب Stream حالت Service را روی Custom قرار
                    داده
                    و
                    برای
                    Server مقدار <var onClick={OnVarTagClicked}
                                      onDoubleClick={OnVarTagClicked}>http://5.56.135.101:1935/show</var> را
                    قرار
                    دهید و برای Stream Key
                    مقدار <var onClick={OnVarTagClicked}
                               onDoubleClick={OnVarTagClicked}>{streamKey}</var> را قرار دهید و مطمئن
                    شوید
                    تیک
                    Use
                    authentication برداشته شده باشد.
                    سپس دکمه Ok را فشار داده و در پنجره اصلی برنامه, بر روی دکمه Start Stream کلیک
                    کنید.
                </h3>
                <h3 className="warning">مقدار Stream Key را در اختیار هیچکس قرار ندهید.</h3>
            </div>
            <h3>در پایان دکمه Stop Streaming را در OBS فشرده و بر روی
                <button id="stop-streaming" onClick={stopSteamButton}>پایان پخش زنده</button>
                کلیک کنید.
            </h3>
        </div>
    );
}

export default LiveInstructorGuide;