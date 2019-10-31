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
        if (classes && classes.length < 1) {
            setClasses(null);
            return;
        }
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
                    {classes.map(c => c && <ClassTemplate key={c.id} classObject={c} />)}
                </RecycleSlider>
            )}
            {/* TODO: Render classes that user is teaching or study */}
        </React.Fragment>
    );
}

export default Dashboard;
