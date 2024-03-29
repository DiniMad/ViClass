// import React, {useState, useEffect} from 'react';
import ChatMessageBox from "./ChatMessageBox";
import ChatEnterMessage from "./ChatEnterMessage";
import * as signalR from "@microsoft/signalr";
import React, {Component} from "react";
import Http from "./Services/HttpService";
import Config from "../config"
import ChatMessagesWrapper from "./ChatMessagesWrapper";
import ChatDisplayUsersButton from "./ChatDisplayUsersButton";
import ChatOnlineUsers from "./ChatOnlineUsers";

let connection;
const userApi = Config.ApiEndpoints.User;
let classId = "1";

class LiveChat extends Component {
    state = {
        userAlreadyExist: false,
        userId: null,
        lastMessageId: null,
        messageList: [],
        onlineUsers: [],
        displayChatUsers: false,
        signalRConnection: null
    };
    componentDidMount = async () => {
        connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
        connection.on("OnReceiveMessage", this.onMessageReceived);
        connection.on("OnSubscribe", this.onSubscribe);
        connection.on("OnUnsubscribe", this.onUnsubscribe);
        connection.on("UserAlreadyExist", this.UserExist);
        await connection.start().catch(function (err) {
            return console.error(err.toString());
        });
        this.setState({signalRConnection: connection});
        connection.invoke("Subscribe", classId).catch(function (err) {
            return console.error(err.toString());
        });
        const {status, data} = await Http.get(userApi);
        if (status === 200)
            this.setState({userId: data.id});
    };
    componentWillUnmount = async () => {
        connection.invoke("Unsubscribe").catch(function (err) {
            return console.error(err.toString());
        });
        await this.state.signalRConnection.stop();
    };
    UserExist = async () => {
        this.setState({userAlreadyExist: true});
        await this.state.signalRConnection.stop();
    };
    onSubscribe = (client) => {
        if (Array.isArray(client))  // First time receive whole the online users
            this.setState({onlineUsers: client});
        else                        // After first time receive just the new user who goes online
            this.setState({onlineUsers: [...this.state.onlineUsers, client]});
    };
    onUnsubscribe = (userId) => {
        const onlineUsers = this.state.onlineUsers.filter(u => u.userId !== userId);
        this.setState({onlineUsers})
    }; // Remove users who goes offline from the online users list
    onMessageReceived = (message) => {
        if (this.state.lastMessageId === message.id) return;
        this.setState({messageList: this.state.messageList.concat(message), lastMessageId: message.id});
    }; // On message receive add message to messages list if its a new message
    sendMessage = message => {
        if (!connection) return;
        connection.invoke("SendMessage", classId, message).catch(function (err) {
            return console.error(err.toString());
        });
    };
    displayChatUser = () => this.setState({displayChatUsers: !this.state.displayChatUsers});

    render() {
        const messages = this.state.messageList;
        const {displayChatUsers, onlineUsers, userId, userAlreadyExist} = this.state;
        return (
            < div id="chat-box">
                {userAlreadyExist
                 ? <div id="chat-box-message"><h2>درحال حاضر یک صفحه چت برای شما باز است.</h2></div>
                 : <>
                     <ChatDisplayUsersButton
                         displayState={displayChatUsers}
                         onDisplayButtonClick={this.displayChatUser}/>
                     <ChatOnlineUsers displayState={displayChatUsers} users={onlineUsers} userId={userId}/>
                     <div id="chat-box-header"><h3>{onlineUsers.length} کاربر آنلاین</h3></div>
                     <ChatMessagesWrapper>
                         {
                             messages.map(m => <ChatMessageBox key={m.id}
                                                               senderUserId={m.userId}
                                                               text={m.text}
                                                               byMe={m.userId === this.state.userId}
                                                               sender={m.user}
                                                               time={m.time}/>)
                         }
                     </ChatMessagesWrapper>
                     <ChatEnterMessage sendMessage={this.sendMessage}/>
                 </>}
            </div>
        );
    }
}

export default LiveChat;
