import React, { useState, useEffect } from "react";
import http from "./Services/HttpService";
import config from "../config.json";
import RecycleSlider from "./RecycleSlider";
import ClassTemplate from "./ClassTemplate";
import Navbar from "./Navbar";

const studentClassesApi = config.ApiEndpoints.StudentClass;

function Dashboard() {
    const [classes, setClasses] = useState(null);

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        getData();
    }, []);

    const getData = async () => {
        const { data: classes } = await http.get(studentClassesApi);
        // TODO: remove the dummy items created below.
        classes[1] = classes[2] = classes[3] = classes[4] = classes[5] = classes[6] = classes[7] = classes[0];
        setClasses(classes);
    };
    // noinspection JSUnresolvedVariable
    return (
        <React.Fragment>
            <Navbar />
            {classes && (
                <RecycleSlider itemCountToShow={5} itemWidth={300}>
                    {classes.map(c => (
                        <ClassTemplate key={c.id} classObject={c} />
                    ))}
                </RecycleSlider>
            )}
        </React.Fragment>
    );
}

export default Dashboard;
