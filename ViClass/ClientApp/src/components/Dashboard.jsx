import React, { useState, useEffect } from "react";
import http from "./Services/HttpService";
import config from "../config.json";
import RecycleSlider from "./RecycleSlider";
import ClassTemplate from "./ClassTemplate";
import Navbar from "./Navbar";
import useGetData from "./Hooks/useGetData";

const studentClassesApi = config.ApiEndpoints.StudentClass;

function Dashboard() {
    const { data: classes, responseStatus } = useGetData(studentClassesApi);

    // TODO: remove the dummy items created below.
    classes &&
        classes[0] &&
        (classes[1] = classes[2] = classes[3] = classes[4] = classes[5] = classes[6] = classes[7] = classes[0]);

    return (
        <React.Fragment>
            <Navbar />
            {responseStatus === 200 && classes && (
                <RecycleSlider itemCountToShow={5} itemWidth={300}>
                    {classes.map(c => c && <ClassTemplate key={c.id} classObject={c} />)}
                </RecycleSlider>
            )}
            {/* TODO: Render classes that user is teaching or study */}
        </React.Fragment>
    );
}

export default Dashboard;
