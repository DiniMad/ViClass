import React from 'react';

function ClassInstructor({instructor}) {
    // Destructuring properties from instructor
    const {userName} = instructor;
    
    return (
        <div className="class-instructor">
            <p>{userName}</p>
        </div>
    );
}

export default ClassInstructor;