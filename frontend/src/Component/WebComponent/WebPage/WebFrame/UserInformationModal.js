import Modal from 'react-modal'
import React from "react";

const UserInformationModal=({open,setOpen})=>{
    return(
        <Modal
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            style={{
                overlay: {
                    position: 'inherit',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(54, 54, 54, 0.75)',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    zIndex: '99'
                },
                content: {
                    display: 'flex',
                    position: 'absolute',
                    top: '15%',
                    left: '60%',
                    width: '20%',
                    height: '30%',
                    border: 'none',
                    background: 'lightgreen',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '15px',
                    outline: 'none',
                    padding: '20px',
                    fontSize: '14sp',
                    alignItems: 'left',
                    flexDirection: 'column',
                    color: 'white'
                }

            }}
        >
            <h3>사용자 정보</h3>
            <p>닉네임 : oxix</p>
            <p>게임 수 : 10</p>
            <p>승 : </p>
            <p>패 : </p>
            <p>승률 : </p>
            <div onClick={() => setOpen(false)}>
                X
            </div>
            <div>
                ff
            </div>
        </Modal>

    )
}
export default UserInformationModal