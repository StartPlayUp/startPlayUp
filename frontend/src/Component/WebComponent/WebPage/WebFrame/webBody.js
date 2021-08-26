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
import { buttonGlobalHover } from "../../../../Routes";
import axios from "axios";

const BODY = ({ location, history }) => {
  console.log(location);
  console.log(history);
  const [gameList, setGameList] = useState([])

  useEffect(() => {
    axios.post('http://localhost:4000/getRooms')
      .then(function (result) {
        console.log('get useEffect')
        const { roomList, success } = result.data
        success && setGameList(roomList)
      })
      .catch(function (error) {
        console.error("error : ", error);
      });
  }, []);

  return (
    <>
      {/* <HEADER/> */}
      <BodyFrame>
        {/*<buttonGlobalHover/>*/}
        <BodyCenter>
          <ButtonArea>
            <CreateButton type={"submit"} />
          </ButtonArea>
          <RoomFrame>
            <UserList color={"#566270"} background={"white"}>
              <Users width={"5vw"}>방 번호</Users>
              <Users width={"15vw"}>게임 이름</Users>
              <Users width={"30vw"}>방 제목</Users>
              <Users width={"15vw"}>방 사용자</Users>
              <Users width={"5vw"}>인원</Users>
            </UserList>
            <hr />
            <UserList onClick={() => history.push("/waitingRoom")}>
              <Users width={"5vw"}>1</Users>
              <Users width={"15vw"}>Yut</Users>
              <Users width={"30vw"}>윷놀이 ㄱ ㄱ</Users>
              <Users width={"15vw"}>Jang</Users>
              <Users width={"5vw"}>3</Users>
            </UserList>
            <hr />
            <UserList onClick={() => history.push("/waitingRoom")}>
              <Users width={"5vw"}>1</Users>
              <Users width={"15vw"}>Mafia</Users>
              <Users width={"30vw"}>마피아 빠르게 한판 ㄱ ㄱ</Users>
              <Users width={"15vw"}>Jang</Users>
              <Users width={"5vw"}>3</Users>
            </UserList>
            <UserList>
              {
                gameList.map(function (rooms, index) {
                  console.log('rooms' + rooms)
                })
              }
            </UserList>
            <hr />
          </RoomFrame>
        </BodyCenter>
      </BodyFrame>
    </>
  );
};

export default BODY;
