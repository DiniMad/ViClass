import React, { Component } from "react";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { ApplicationPaths } from "./api-authorization/ApiAuthorizationConstants";
import ClassTemplate from "./ClassTemplate";
import http from "./Services/HttpService";
import config from "../config.json";

const logoutPath = {
    pathname: `${ApplicationPaths.LogOut}`,
    state: { local: true }
};

const studentClassesApi = config.ApiEndpoints.StudentClass;

class Dashboard extends Component {
    state = {
        classes: null
    };

    componentDidMount = async () => {
        var { data: classes } = await http.get(studentClassesApi);
        this.setState({ classes });
    };

    render() {
        return (
            <React.Fragment>
                <NavLink tag={Link} className="text-dark" to={logoutPath}>
                    Logout
                </NavLink>
                {this.state.classes &&
                    this.state.classes.map(c => (
                        <ClassTemplate
                            key={c.id}
                            title={c.title}
                            description={c.description}
                            instructor={c.instructor}
                            dayOfWeekSchedules={c.dayOfWeekSchedules}
                            startDateFormatted={c.startDateFormatted}
                        ></ClassTemplate>
                    ))}
            </React.Fragment>
        );
    }
}

export default Dashboard;
