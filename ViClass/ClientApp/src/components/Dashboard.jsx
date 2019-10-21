import React, { Component } from "react";

import http from "./Services/HttpService";
import config from "../config.json";
import RecycleSlider from "./RecycleSlider";
import ClassTemplate from "./ClassTemplate";
import Navbar from "./Navbar";



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
                <Navbar/>
   
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
                            />
                        ))}
                    </RecycleSlider>
                )}
            </React.Fragment>
        );
    }
}

export default Dashboard;
