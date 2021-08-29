import React, { useEffect, useState } from "react";
import FOOTER from "./webFooter";
import HEADER from "./webHeader";
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
import { Input, LoginMid, LoginModal, Modal } from "../Style/CreateRoomStyle";

const BODY = ({ location, history }) => {
  console.log(location);
  console.log(history);
  const [gameList, setGameList] = useState([]);
  const [isSecret, setIsSecret] = useState(false);
  const [password, setPassword] = useState("");
  const [room, setRoom] = useState();

  const historyPush = (rooms) => {
    console.log('history.push rooms : ')
    console.log(rooms)
    history.push({
      pathname: "/waitingRoom",
      state: {
        input: rooms.roomTitle,
        game: rooms.gameType,
      },
      list: {
        guestList: rooms.guestList,
      },
    });
  };

  const onClick = (rooms) => {
    if (rooms.secret) {
      setIsSecret(true);
      setRoom(rooms);
    } else {
      console.log('onClick rooms')
      console.log(rooms)
      historyPush(rooms);
    }
  };

  const passwordChecker = () => {
    console.log("----------------------start");
    console.log(room);
    console.log(room.hostname);
    console.log(room.password);
    console.log(`password : ${password.toString()}`)
    console.log('-------------------------------end')
    if (room.password === password.toString()) {
      historyPush(room);
    } else {
      setIsSecret(false);
      setPassword("");
      setRoom("");
    }
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
      {/* <HEADER/> */}
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
                  <Users width={"30vw"}>{`${rooms.roomTitle}  ${
                    rooms.secret ? "🔐" : ""
                  }`}</Users>
                  <Users width={"15vw"}>{rooms.hostname}</Users>
                  <Users width={"5vw"} align={"center"}>
                    {rooms.roomLimit}
                  </Users>
                </UserList>
              );
            })}
          </RoomFrame>
          {isSecret && (
            <Modal>
              <LoginMid>
                <LoginModal>
                  <button onClick={() => setIsSecret(false)}>x</button>
                  <label>
                    <span>암호 : &nbsp; </span>
                    <input type="password" onChange={onPasswordChange} />
                  </label>
                  <button onClick={passwordChecker}>확인</button>
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
