import React from "react";
import RecycleSlider from "./RecycleSlider";
import ClassTablet from "./ClassTablet";
import Navbar from "./Navbar";
import ClassTableView from "./ClassTableView";
import useGetData from "./Hooks/useGetData";
import Config from "../config";

const classesApi = Config.ApiEndpoints.Class;

function Dashboard() {


    const [allClasses, allClassesResponseStatus] = useGetData(classesApi);
    const [classesRelatedToUser, classesRelatedToUserResponseStatus] = useGetData(classesApi + "StudyOrTeaching");

    return (
        <>
            <Navbar/>
            <div className="dashboard">
                {allClassesResponseStatus === 200 && allClasses && (
                    !allClasses[0]
                    ? <div className="dashboard-all-class-message"><h2>تمامی کلاس های موجود.</h2></div>
                    : (
                        <RecycleSlider itemCountToShow={5} itemWidth={300}>
                            {allClasses.map(c => c && <ClassTablet key={c.id} classObject={c}/>)}
                        </RecycleSlider>)
                )}
                {classesRelatedToUserResponseStatus === 200 && classesRelatedToUser &&
                <ClassTableView classes={classesRelatedToUser}/>}
            </div>
        </>
    );
}

export default Dashboard;
