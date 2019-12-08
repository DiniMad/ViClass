import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

function ChatOnlineUsers({displayState, users, userId}) {
    const [sortedUsersList, setSortedUserList] = useState(null);
    
    useEffect(() => {
        if (!userId) return;
        if (users.length > 1) { // If there is more than one online user bring sender name to first of the list
            let userIdsArray = users.map(u => u && u.userId);
            let indexOfTheUser = userIdsArray.indexOf(userId);
            let tempArray = [...users];
            let temp = tempArray[0];
            tempArray[0] = tempArray[indexOfTheUser];
            tempArray[indexOfTheUser] = temp;
            setSortedUserList(tempArray);
            return;
        }
        setSortedUserList(users);
    }, [users, userId]); 

    return (
        <div id="chat-online-users" className={displayState
                                               ? "display"
                                               : ""}>
            <div className="list">
                {sortedUsersList &&
                sortedUsersList.map(u => u &&
                    <Link key={u.userId}
                          to={`/user/${u.userId}`}
                          className="online-user">
                        {u.userName}
                    </Link>)}
            </div>
        </div>
    );
}

export default ChatOnlineUsers;