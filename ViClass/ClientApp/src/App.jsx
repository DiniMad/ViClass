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
import "./styles/style.min.css";
import CurrentDateContext from "./components/Context/CurrentDateContext";
import Class from "./components/Class";
import useGetData from "./components/Hooks/useGetData";
import Config from "./config";

const currentDateApi = Config.ApiEndpoints.CurrentDate;

export default function App() {
    const { data: currentDate, responseStatus } = useGetData(currentDateApi);

    return (
        <React.Fragment>
            {/* <Layout> */}
            <Route exact path="/" component={Home} />
            <Route path="/counter" component={Counter} />
            <Route path="/loading" component={Loading} />
            <AuthorizeRoute path="/fetch-data" component={FetchData} />
            <CurrentDateContext.Provider value={currentDate}>
                <AuthorizeRoute path="/dashboard" component={Dashboard} />
                <CurrentDateContext.Provider value={responseStatus === 200 && currentDate}>
            </CurrentDateContext.Provider>
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            {/* </Layout> */}
        </React.Fragment>
    );
}
