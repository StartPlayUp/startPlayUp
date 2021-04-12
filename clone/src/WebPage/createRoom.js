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
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel tempora nulla, non molestiae dicta
                        ducimus. Et unde laborum eveniet ex quod doloribus quae, aliquam beatae atque, vero assumenda
                        rem quo?
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