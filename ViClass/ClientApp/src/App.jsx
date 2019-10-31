import React from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import Dashboard from "./components/Dashboard";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import Loading from "./components/Loading";
import CurrentDateContext from "./components/Context/CurrentDateContext";
import Class from "./components/Class";
import "./styles/style.min.css";
import useGetData from "./components/Hooks/useGetData";
import useAuthenticateUser from "./components/Hooks/useAuthenticateUser";
import Config from "./config";
import UserContext from "./components/Context/UserContext";

const currentDateApi = Config.ApiEndpoints.CurrentDate;

export default function App() {
    const { data: currentDate, responseStatus } = useGetData(currentDateApi);
    const user = useAuthenticateUser();

    return (
        <React.Fragment>
            {/* <Layout> */}
            <Route exact path="/" component={Home} />
            <Route path="/counter" component={Counter} />
            <Route path="/loading" component={Loading} />
            <AuthorizeRoute path="/fetch-data" component={FetchData} />
            <UserContext.Provider value={user}>
                <CurrentDateContext.Provider value={responseStatus === 200 && currentDate}>
                    <AuthorizeRoute path="/dashboard" component={Dashboard} />
                    <AuthorizeRoute path="/class/:id" component={Class} />
                </CurrentDateContext.Provider>
            </UserContext.Provider>
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            {/* </Layout> */}
        </React.Fragment>
    );
}
