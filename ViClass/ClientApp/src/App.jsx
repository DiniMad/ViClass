import React from "react";
import {Route} from "react-router";
import Home from "./components/Home";
import {FetchData} from "./components/FetchData";
import {Counter} from "./components/Counter";
import Dashboard from "./components/Dashboard";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import {ApplicationPaths} from "./components/api-authorization/ApiAuthorizationConstants";
import Loading from "./components/Loading";
import CurrentDateContext from "./components/Context/CurrentDateContext";
import Class from "./components/Class";
import User from "./components/User";
import Notification from "./components/Notification";
import CreateClass from "./components/CreateClass";
import LiveClass from "./components/LiveClass";
import useAuthenticateUser from "./components/Hooks/useAuthenticateUser";
import useNotification from "./components/Hooks/useNotification";
import useCurrentDate from "./components/Hooks/useCurrentDate";
import AuthenticatedUserContext from "./components/Context/AuthenticatedUserContext";
import NotificationContext from "./components/Context/NotificationContext";
import "./styles/style.min.css";


export default function App() {

    const [currentDate, setCurrentDate] = useCurrentDate();
    const user = useAuthenticateUser();
    const {display, textTag, notificationType, displayNotification} = useNotification();

    return (
        <React.Fragment>
            <NotificationContext.Provider value={displayNotification}>
                <Route exact path="/" component={Home}/>
                <Route path="/counter" component={Counter}/>
                <Route path="/loading" component={Loading}/>
                <AuthorizeRoute path="/fetch-data" component={FetchData}/>
                <AuthenticatedUserContext.Provider value={user}>
                    <CurrentDateContext.Provider value={currentDate && [currentDate, setCurrentDate]}>
                        <AuthorizeRoute path="/dashboard" component={Dashboard}/>
                        <AuthorizeRoute path="/create" component={CreateClass}/>
                        <AuthorizeRoute path="/class/:id" component={Class}/>
                        <AuthorizeRoute path="/user/:id" component={User}/>
                        <AuthorizeRoute path="/live/:id" component={LiveClass}/>
                    </CurrentDateContext.Provider>
                </AuthenticatedUserContext.Provider>
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes}/>
                <Notification display={display} textTag={textTag} type={notificationType}/>
            </NotificationContext.Provider>
        </React.Fragment>
    );
}
