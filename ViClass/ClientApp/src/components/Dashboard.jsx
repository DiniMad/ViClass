import React, { Component } from "react";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { ApplicationPaths } from "./api-authorization/ApiAuthorizationConstants";
import http from "./Services/HttpService";
import config from "../config.json";
import RecycleSlider from "./RecycleSlider";
import ClassTemplate from "./ClassTemplate";

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
        // TODO: remove the dummy items created below.
        classes[1] = classes[2] = classes[3] = classes[4] = classes[5] = classes[6] = classes[7] =
            classes[0];
        console.log(classes);
        this.setState({ classes });
    };

    render() {
        return (
            <React.Fragment>
                <NavLink tag={Link} className="text-dark" to={logoutPath}>
                    Logout
                </NavLink>
                {this.state.classes && (
                    <RecycleSlider itemCountToShow={5} itemWidth={300}>
                        {this.state.classes.map(c => (
                            <ClassTemplate
                                key={c.id}
                                title={c.title}
                                description={c.description}
                                instructor={c.instructor}
                                dayOfWeekSchedules={c.dayOfWeekSchedules}
                                startDateFormatted={c.startDateFormatted}
                            ></ClassTemplate>
                        ))}
                    </RecycleSlider>
                )}
            </React.Fragment>
        );
    }
}

export default Dashboard;
