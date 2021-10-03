import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Modal,
  LoginMid,
  LoginModal,
  Close,
  ModalContents,
  Title,
  Games,
  SelectGame,
  RoomTitle,
  Input,
  SelectPrivate,
  Select,
  Footer,
  ResultButton,
  Option,
} from "../Style/CreateRoomStyle";
import axios from "axios";

const CreateRoom = ({ isOpen, close }) => {
  axios.defaults.withCredentials = true;
  const history = useHistory();
  const [input, setInput] = useState("");
  const [game, setGame] = useState("Yutnori");
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [roomLimit, setRoomLimit] = useState(2);
  const roomLimits = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const onChange = (e) => {
    setInput(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onGameChange = (e) => {
    setGame(e.target.value);
  };

  const onCheckChange = () => {
    setChecked(!checked);
  };
  const onRoomLimitChange = (e) => {
    setRoomLimit(e.target.value);
  };
  const onCLick = async () => {
    if (input.replaceAll(' ', '').length === 0) {
      alert('제목을 입력하세요')
      return
    }
    const createRoomConfig = {
      method: "post",
      url: "http://localhost:4000/api/room/createRoom",
      data: {
        hostname: localStorage.getItem("nickname"),
        guestList: [localStorage.getItem("nickname")], // 게임 만들때 자기 자신도 들어가야 하나? 일단 추가함. 테스트후 삭제 요망
        roomTitle: input,
        gameType: game,
        play: false,
        secret: password !== "",
        password: password,
        roomLimit: roomLimit,
      },
    };
    try {
      const roomId = await axios(createRoomConfig);
      console.log("생성 id: ", roomId.data);
      history.push({
        pathname: "/waitingRoom",
        state: {
          roomTitle: input,
          gameType: game,
          roomLimit: roomLimit,
          hostname: localStorage.getItem("nickname"),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isOpen ? (
        <Modal>
          <LoginMid>
            <LoginModal>
              <Close onClick={close}>&times;</Close>
              <ModalContents onClick={isOpen}>
                <Title size={'28px'}>StartPlayUp</Title>
                <RoomTitle>
                  <span>제목 : &nbsp; </span>
                  <Input
                    type="text"
                    maxLength="25"
                    width="200px"
                    value={input}
                    onChange={onChange}
                  />
                </RoomTitle>
                <RoomTitle>
                  <span>암호 : &nbsp; </span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={onCheckChange}
                  />
                  {checked && (
                    <Input
                      onChange={onPasswordChange}
                      type="password"
                      maxLength="10"
                      width="180px"
                    />
                  )}
                </RoomTitle>
                <SelectGame>
                  <Option>
                    <div>
                      option : &nbsp;
                      <Select value={game} onChange={onGameChange}>
                        <Games value={"Yut"}>윷놀이</Games>
                        <Games value={"YachtDice"}>요트 다이스</Games>
                        <Games value={"AVALON"}>아발론</Games>
                        <Games value={"MineSearch"}>지뢰 찾기</Games>
                      </Select>
                    </div>
                    <div>
                      players : &nbsp;
                      <Select value={roomLimit} onChange={onRoomLimitChange}>
                        {roomLimits.map((index) => (
                          <Games
                            key={index}
                            value={index}>
                            {index}
                          </Games>
                        ))}
                      </Select>
                    </div>
                  </Option>
                </SelectGame>
                {/*<SelectPrivate>*/}
                {/*  <span>관전허용 : </span>*/}
                {/*  <input type="checkbox" />*/}
                {/*</SelectPrivate>*/}
              </ModalContents>
              <Footer>
                {/*<ResultButton color='#B8B8B0'>취소</ResultButton>*/}
                <ResultButton color="#A593E0" onClick={onCLick}>
                  확인
                </ResultButton>
              </Footer>
            </LoginModal>
          </LoginMid>
        </Modal>
      ) : null}
    </>
  );
};

export default CreateRoom;
