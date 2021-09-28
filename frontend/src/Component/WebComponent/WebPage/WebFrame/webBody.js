import React, { createContext, useContext, useEffect, useState } from "react";
import CreateButton from "./CreateButton";

import {
    BodyFrame,
    BodyCenter,
    RoomFrame,
    UserList,
    Users,
    ButtonArea,
} from "../Style/WebFrameStyle";
import axios from "axios";
import {
    Close,
    Footer,
    Input,
    LoginMid,
    LoginModal,
    Modal,
    ModalContents,
    ResultButton,
    Title
} from "../Style/CreateRoomStyle";
import HEADER from "./webHeader";
import { RoomIdContext } from "../../../../Routes/peerStore";

const BODY = ({ location, history }) => {
    const [gameList, setGameList] = useState([])
    const [isSecret, setIsSecret] = useState(false)
    const [password, setPassword] = useState("")
    const [room, setRoom] = useState()
    const { roomID, setRoomID } = useContext(RoomIdContext)
    const nickname = (fullNickname) => {
        return fullNickname.substring(0, fullNickname.indexOf(' '))
    }
    const historyPush = (room) => {
        console.log('history.push rooms : ')
        console.log(room)
        setRoomID({ id: room.roomId, state: true })
        history.push({
            pathname: "/waitingRoom",
            state: {
                guestList: room.guestList,
                hostname: room.hostname,
                gameType: room.gameType,
                roomTitle: room.roomTitle,
            },
        });
    };

    const onClick = async (room) => {
        if (room.secret) {
            setIsSecret(true);
            setRoom(room);
        } else {
            console.log('onClick rooms')
            // =======================
            const { success } = await getRoom(room.roomId);
            // ==================
            if (success) {
                historyPush(room);
            }
        }
    };

    const passwordChecker = () => {
        console.log("----------------------start");
        console.log(room);
        console.log(room.hostname);
        console.log(password);
        console.log(`${password}`)
        console.log('-------------------------------end')
        accessRoom(room)
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const accessRoom = (rooms) => {
        console.log('accessRoom')
        console.log(rooms.roomId, password)
        const accessRoomConfig = {
            method: 'post',
            url: 'http://localhost:4000/api/room/accessRoom',
            data: {
                roomId: rooms.roomId,
                password: password,
            }
        }
        axios(accessRoomConfig)
            .then(function (response) {
                console.log("roomId and RoomPassword check : ", response.data);
                if (response.data.success && response.data.correct && response.data.vacancy) {
                    historyPush(room)
                } else {
                    alert('error')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getRoom = async (roomId) => {
        const getRoomConfig = {
            method: 'post',
            url: 'http://localhost:4000/api/room/getRoom',
            data: {
                roomId
            }
        }
        try {
            const roomObject = await axios(getRoomConfig);
            console.log('getRoom')
            console.log(roomObject.data)
            return roomObject.data;
        }
        catch (error) {
            console.error(error)
            return {}
        }
    }
    //메인 페이지 방들
    useEffect(() => {
        axios
            .post('http://localhost:4000/api/room/getRooms')
            .then(function (result) {
                console.log("getRooms post useEffect");
                const { roomList, success } = result.data;
                success && setGameList(roomList);
            })
            .catch(function (error) {
                console.error("error : ", error);
            });
    }, []);

    return (
        <>
            {/*<HEADER/>*/}
            <BodyFrame>
                <BodyCenter>
                    <ButtonArea>
                        <CreateButton type={"submit"} />
                    </ButtonArea>
                    <RoomFrame>
                        <UserList background={"white"}>
                            <Users width={"5vw"} align={"center"}>
                                방 번호
                            </Users>
                            <Users width={"15vw"}>게임 이름</Users>
                            <Users width={"30vw"}>방 제목</Users>
                            <Users width={"15vw"}>방 사용자</Users>
                            <Users width={"5vw"} align={"center"}>
                                인원
                            </Users>
                        </UserList>
                        {gameList.map(function (rooms, index) {
                            return (
                                <UserList
                                    key={index}
                                    background={"#FFFFF3"}
                                    onClick={() => onClick(rooms, index)}
                                >
                                    <Users width={"5vw"} align={"center"}>
                                        {index + 1}
                                    </Users>
                                    <Users width={"15vw"}>{rooms.gameType}</Users>
                                    <Users width={"30vw"}>{`${rooms.roomTitle}  ${rooms.secret ? "🔐" : ""
                                        }`}</Users>
                                    <Users width={"15vw"}>{nickname(rooms.hostname)}</Users>
                                    <Users width={"5vw"} align={"center"}>
                                        {`${rooms.guestList.length} / ${rooms.roomLimit}`}
                                    </Users>
                                </UserList>
                            );
                        })}
                    </RoomFrame>
                    {isSecret && (
                        <Modal>
                            <LoginMid>
                                <LoginModal>
                                    <Close onClick={() => setIsSecret(false)}>x</Close>
                                    <ModalContents>
                                        <Title size={'24px'}>StartPlayUp</Title>
                                        <Title size={'32px'}>🔐</Title>
                                        <label>
                                            <span>암호 : &nbsp; </span>
                                            <Input
                                                type="password"
                                                onChange={onPasswordChange}
                                                placeholder={'암호를 입력하세요.'}
                                                width={'200px'}
                                            />
                                        </label>
                                    </ModalContents>
                                    <Footer>
                                        <ResultButton onClick={passwordChecker}>
                                            확인
                                        </ResultButton>
                                    </Footer>
                                </LoginModal>
                            </LoginMid>
                        </Modal>
                    )}
                </BodyCenter>
            </BodyFrame>
        </>
    );
};

export default BODY;
