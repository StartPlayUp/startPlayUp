import React from "react";


function Users(props) {
    return (
        <div>
            <span>{props.id}  </span>
            <b>{props.name}</b>
            <span>{props.log}</span>
        </div>
    )
}

export default Users