import Modal from 'react-modal'
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../../Style/WaitingRoomStyle";
import * as S from '../../../../GameComponent/AVALON_BETA/Styled'
import axios from "axios";
import { Route } from "react-router";
import { LoginApp } from "Component/WebComponent/WebPage";
import { useCookies } from "react-cookie";
import { Close } from "../../Style/CreateRoomStyle";
import { getEnvIp } from "Common/envModule"

const UserInformationModal = ({ setOpen }) => {
    axios.defaults.withCredentials = true;
    const history = useHistory()
    const [information, setInformation] = useState(undefined)
    const fullNickname = localStorage.getItem('nickname')
    const nickname = fullNickname.substring(0, fullNickname.indexOf(' '))
    const onClick = () => {
        setOpen(false)
        history.push({
            pathname: '/main'
        })
    }
    //회원탈퇴 시키기
    const deleteUserFromNickname = () => {
        const deleteUserFromNicknameConfig = {
            method: 'post',
            url: getEnvIp().SERVER_IP + '/api/user/deleteUser',
            data: {
                nickname,
            }
        }
        console.log(deleteUserFromNicknameConfig)
        axios(deleteUserFromNicknameConfig)
            .then(function (response) {
                console.log("해당 닉네임으로 가입한 계정 삭제 : ", response.data);
                localStorage.removeItem('nickname')
                setOpen(false)
                window.location.replace('/')
                alert("회원 탈퇴되었습니다.")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        const getUserConfig = {
            method: 'get',
            url: getEnvIp().SERVER_IP + `/api/user/getUser`,
        }
        axios(getUserConfig)
            .then(function (response) {
                console.log(`해당 닉네임으로 가입한 사람 데이터 가져오기 : `, response.data);
                const userInfo = response.data.user;
                setInformation(userInfo);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    console.log('information : ' + information)
    return (
        <Modal
            isOpen={true}
            style={{
                overlay: {
                    position: 'flex',
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
                    width: '12%',
                    height: '28%',
                    border: '2px solid purple',
                    background: '#FFFFF3',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '15px',
                    outline: 'none',
                    padding: '15px',
                    fontSize: '14sp',
                    justifyContent: 'center',
                    alignItems: 'left',
                    flexDirection: 'column',
                    color: 'black',
                    transition: 'all 0.6 ease-in-out'
                }
            }}
        >
            <S.ModalColumn>
                <Close onClick={onClick}>&times;</Close>
                <S.ColumnFrame>
                    <S.ModalTitle>사용자 정보</S.ModalTitle>
                    {information !== undefined &&
                        <S.RowFrame>
                            <S.ColumnFrame>
                                &nbsp;
                                <div>{`nickname : ${nickname}`}</div>
                                &nbsp;
                                <div>{`win : ${information.numberOfGames.win}`}</div>
                                &nbsp;
                                <div>{`lose : ${information.numberOfGames.lose}`}</div>
                                &nbsp;
                                <div>{`rate : ${Math.floor(information.numberOfGames.win / (information.numberOfGames.win + information.numberOfGames.lose) * 100)}%`}</div>
                                &nbsp;
                                <div>{`reported: ${information.report.count}`}</div>
                            </S.ColumnFrame>
                        </S.RowFrame>
                    }
                </S.ColumnFrame>
            </S.ModalColumn>
            <Button onClick={deleteUserFromNickname}>
                회원 탈퇴
            </Button>
        </Modal>
    )
}
UserInformationModal.propTypes = {};
export default UserInformationModal