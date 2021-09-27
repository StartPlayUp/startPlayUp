import Modal from 'react-modal'
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Button} from "../../Style/WaitingRoomStyle";
import * as S from '../../../../GameComponent/AVALON_BETA/Styled'
import axios from "axios";

const UserInformationModal = ({setOpen}) => {
    const history = useHistory()
    const fullNickname = localStorage.getItem('nickname')
    const nickname = fullNickname.substring(0, fullNickname.indexOf(' '))
    const [information, setInformation] = useState([])
    const onClick = () => {
        setOpen(false)
        history.push({
            pathname: '/main'
        })
    }
    useEffect(() => {
        const getUserFromNicknameConfig = {
            method: 'get',
            url: `http://localhost:4000/api/user/getUserFromNickname?nickname=${nickname}`,
        }
        axios(getUserFromNicknameConfig)
            .then(function (response) {
                console.log(`해당 닉네임으로 가입한 사람 데이터 가져오기 : ${nickname} : `, response.data);
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
            isOpen={open}
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
                    width: '20%',
                    height: '25%',
                    border: '2px solid purple',
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
            <S.ModalColumn>
                <S.ModalTitle>사용자 정보</S.ModalTitle>
                <S.RowFrame>
                    <S.ColumnFrame>
                        <p>{`nickname : ${nickname}`}</p>
                        <p>{`win : ${information.numberOfGames.win}`}</p>
                        <p>{`lose : ${information.numberOfGames.lose}`}</p>
                        <p>{`rate : ${(information.numberOfGames.win + information.numberOfGames.lose) / information.numberOfGames.lose}`}</p>
                    </S.ColumnFrame>
                    <S.ColumnFrame>
                        <p>{`const: ${information.report.const}`}</p>
                        <p>{`time : ${information.report.time}`}</p>
                    </S.ColumnFrame>
                </S.RowFrame>
            </S.ModalColumn>
            <Button onClick={onClick}>
                닫기
            </Button>
        </Modal>
    )
}
UserInformationModal.propTypes = {};
export default UserInformationModal