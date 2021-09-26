import Modal from 'react-modal'
import React, {useState} from "react";
import {useHistory} from "react-router-dom";

const UserInformationModal = ({setOpen}) => {
    const history = useHistory()
    const onClick = () => {
        setOpen(false)
        history.push({
            pathname: '/main'
        })
    }
    return (
        <Modal
            isOpen={open}
            style={{
                overlay: {
                    position: 'inherit',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(54, 54, 54, 0.75)',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    zIndex: '99',
                    transition: 'all 0.6 ease-in-out'
                },
                content: {
                    display: 'flex',
                    position: 'absolute',
                    top: '15%',
                    left: '60%',
                    width: '20%',
                    height: '30%',
                    border: 'none',
                    background: '#FFFFF3',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '15px',
                    outline: 'none',
                    padding: '20px',
                    fontSize: '14sp',
                    alignItems: 'left',
                    flexDirection: 'column',
                    color: 'black',
                    transition: 'all 0.6 ease-in-out'
                }
            }}
        >
            <h3>사용자 정보</h3>
            <p>닉네임 : oxix</p>
            <p>게임 수 : 10</p>
            <p>승 : </p>
            <p>패 : </p>
            <p>승률 : </p>
            <h3 onClick={onClick}>
                X
            </h3>
            <div>
                ff
            </div>
        </Modal>
    )
}
UserInformationModal.propTypes = {};
export default UserInformationModal