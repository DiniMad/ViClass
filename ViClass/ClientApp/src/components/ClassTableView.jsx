import React from 'react';
import ClassTableViewItem from "./ClassTableViewItem";

function ClassTableView({classes}) {
    return (
        <div className="class-table-view">
            {classes.map(c => c && <ClassTableViewItem key={c.id} classObject={c}/>)}
        </div>
    );
}

export default ClassTableView;