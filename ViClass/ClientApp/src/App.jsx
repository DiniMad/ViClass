import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import Dashboard from "./components/Dashboard";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import Loading from "./components/Loading";
import "./styles/style.scss";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <React.Fragment>
                {/* <Layout> */}
                <Route exact path="/" component={Home} />
                <Route path="/counter" component={Counter} />
                <Route path="/loading" component={Loading} />
                <AuthorizeRoute path="/fetch-data" component={FetchData} />
                <AuthorizeRoute path="/dashboard" component={Dashboard} />
                <Route
                    path={ApplicationPaths.ApiAuthorizationPrefix}
                    component={ApiAuthorizationRoutes}
                />
                {/* </Layout> */}
            </React.Fragment>
        );
    }
}
