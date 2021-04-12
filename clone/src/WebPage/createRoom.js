import React from "react";
import styled from "styled-components";

function CreateRoom() {
    return (
        <React.Fragment>
            <div className="Modal-overlay"/>
            <div className="Modal">
                <p className="title">Modal Title</p>
                <div className="content">
                    <p>
                        Modal
                    </p>
                </div>
                <div className="button-wrap">
                    <button> Confirm</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CreateRoom;