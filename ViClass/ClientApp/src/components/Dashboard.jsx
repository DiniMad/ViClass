import React from "react";
import RecycleSlider from "./RecycleSlider";
import ClassTemplate from "./ClassTemplate";
import Navbar from "./Navbar";
import ClassTableView from "./ClassTableView";
import useGetData from "./Hooks/useGetData";
import Config from "../config";

const classesApi = Config.ApiEndpoints.Class;

function Dashboard() {


    const [classes, responseStatus] = useGetData(classesApi + "StudyOrTeaching");
    // const {data: studyOrTeachingClasses, responseStatus} = useGetData(classesApi+ "StudyOrTeaching");

    // TODO: remove the dummy items created below.
    classes &&
    classes[0] &&
    (classes[1] = classes[2] = classes[3] = classes[4] = classes[5] = classes[6] = classes[7] = classes[0]);
    classes && console.log(classes);

    return (
        <>
            <Navbar/>
            <div className="dashboard">
                {responseStatus === 200 && classes && (
                    <RecycleSlider itemCountToShow={5} itemWidth={300}>
                        {classes.map(c => c && <ClassTemplate key={c.id} classObject={c}/>)}
                    </RecycleSlider>)}
                {responseStatus === 200 && classes && <ClassTableView classes={classes}/>}
            </div>
        </>
    );
}

export default Dashboard;
