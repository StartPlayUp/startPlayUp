import {
  expandRoles,
  EXPEDITION_FRAME,
  EXPEDITION_RESULT,
  FRAME_MAIN,
  initialData,
  mustHaveRoles,
  needPlayers,
  VOTE_FRAME,
  VOTE_RESULT,
  MINIMUM_PLAYER_NUMBER,
  MAXIMUM_PLAYER_NUMBER,
  testRoles,
} from "../Store";
import { sendDataToPeers } from "../../../../Common/peerModule/sendToPeers";
import { AVALON, GAME } from "../../../../Constants/peerDataTypes";
import { GET_DATA_FROM_PEER } from "../../../../Constants/actionTypes";
import { shuffle } from "lodash";

export const UPDATE_TIMER = "UPDATE_TIMER";
export const GAME_CHECK = "GAME_CHECK";
export const SET_COMPONENT = "SET_COMPONENT";
export const START_FRAME = "START_FRAME";
export const MAIN_VOTE_ONCLICK = "MAIN_VOTE_ONCLICK";
export const VOTE_CHECK = "VOTE_CHECK";
export const VOTE_ONCLICK = "VOTE_ONCLICK";
export const VOTE_RESULT_CHECK = "VOTE_RESULT_CHECK";
export const EXPEDITION_CLICK = "EXPEDITION_CLICK";
export const ASSASSIN_KILL = "ASSASSIN_KILL";
export const WAITING_FRAME = "WAITING_FRAME";

const reducer = (state, { type, ...action }) => {
  const nickname = localStorage.getItem("nickname");
  console.log("dispatch: ", state, type, action);
  switch (type) {
    case UPDATE_TIMER: {
      return { ...state, peers: action.peers };
    }
    case GET_DATA_FROM_PEER: {
      sendDataToPeers(GAME, {
        game: AVALON,
        nickname,
        peers: action.peers,
        data: state,
      });
      return { ...state, ...action.data };
    }
    case SET_COMPONENT: {
      const gameData = { ...state };
      sendDataToPeers(GAME, {
        game: AVALON,
        nickname,
        peers: action.peers,
      });
      return { ...state, component: action.component };
    }
    case START_FRAME: {
      const gameData = { ...initialData };
      gameData.usingPlayers.push({
        nickname: nickname.toString(),
        role: "",
        vote: "",
        toGo: "",
        selected: false,
      }); //나 추가하기
      action.peers.forEach((i) => {
        console.log(`peers.forEach`);
        gameData.usingPlayers.push({
          nickname: i.nickname,
          role: "",
          vote: "",
          toGo: "",
          selected: false,
        });
      }); // 나를 제외한 모두 추가하기

      const playersNumber = gameData.usingPlayers.length; //게임에 참여한 인원
      console.log(`playersNumber : ${playersNumber}`);
      switch (playersNumber) {
        case 2:
          gameData.takeStage = needPlayers._2P;
          break;
        case 5:
          gameData.takeStage = needPlayers._5P;
          break;
        case 6:
          gameData.takeStage = needPlayers._6P;
          break;
        case 7:
          gameData.takeStage = needPlayers._7P;
          break;
        case 8:
        case 9:
        case 10:
          gameData.takeStage = needPlayers._8to10P;
          break;
        default:
          alert("error");
      } // 참여 인원별 원정 설정하기
      if (playersNumber >= MINIMUM_PLAYER_NUMBER) {
        // 5명 이상인 경우 직업설정
        const temp = [
          ...mustHaveRoles,
          ...expandRoles.slice(0, gameData.usingPlayers.length - 5),
        ];
        const roles = playersNumber === 2 ? testRoles : shuffle(temp);
        gameData.usingPlayers.map((user, index) => {
          user.role = roles[index];
        });
        gameData.component = FRAME_MAIN;
        sendDataToPeers(GAME, {
          game: AVALON,
          nickname,
          peers: action.peers,
          data: gameData,
        });
        return {
          ...state,
          component: gameData.component,
          usingPlayers: gameData.usingPlayers,
          takeStage: gameData.takeStage,
        };
      } else {
        // 그렇지 않은 경우 몇명 더 필요한지 알림
        alert(
          `${playersNumber}명입니다. ${5 - playersNumber}명이 더 필요합니다.`
        );
        return null;
      }
    }
    case VOTE_CHECK: {
      const gameData = { ...state };
      let agree = 0;
      let oppose = 0;
      gameData.usingPlayers.map((e) =>
        e.toGo === "agree" ? ++agree : ++oppose
      );
      if (agree >= oppose) {
        gameData.component = EXPEDITION_FRAME;
      } else {
        if (gameData.voteStage === 4) {
          gameData.takeStage[gameData.expeditionStage] = "x";
          gameData.expeditionStage += 1;
          gameData.voteStage = 0;
        } else {
          gameData.voteStage += 1;
        }
        gameData.component = FRAME_MAIN;
      }
      // component, voteStage,expeditionStage,vote,represent
      gameData.vote = [];
      gameData.represent += 1;
      gameData.represent %= gameData.usingPlayers.length;
      console.log("--------VOTE_CHECK---------");
      console.log(action.peers);
      sendDataToPeers(GAME, {
        game: AVALON,
        nickname,
        peers: action.peers,
        data: gameData,
      });
      return {
        ...state,
        component: gameData.component,
        usingPlayers: gameData.usingPlayers,
        takeStage: gameData.takeStage,
        vote: gameData.vote,
        represent: gameData.represent,
        voteStage: gameData.voteStage,
        expeditionStage: gameData.expeditionStage,
      };
    }
    case EXPEDITION_CLICK: {
      const gameData = { ...state };
      if (gameData.expeditionStage === 4 && gameData.usingPlayers.length >= 7) {
        if (gameData.vote.filter((element) => "x" === element).length >= 2) {
          gameData.takeStage[gameData.expeditionStage] = "x";
        } else {
          gameData.takeStage[gameData.expeditionStage] = "o";
        }
        gameData.vote.includes("x")
          ? (gameData.takeStage[gameData.expeditionStage] = "x")
          : (gameData.takeStage[gameData.expeditionStage] = "o");
      }
      gameData.expeditionStage += 1;
      gameData.component = EXPEDITION_RESULT;
      gameData.voteStage = 0;
      gameData.usingPlayers.map((user) => {
        user.selected = false;
      });
      console.log("reducer_expeditionClick");
      console.log(action.peers);
      sendDataToPeers(GAME, {
        game: AVALON,
        nickname,
        peers: action.peers,
        data: gameData,
      });
      return {
        ...state,
        takeStage: gameData.takeStage,
        expeditionStage: gameData.expeditionStage,
        voteStage: gameData.voteStage,
        usingPlayers: gameData.usingPlayers,
        component: gameData.component,
      };
    }
    case ASSASSIN_KILL: {
      console.log("ASSASSIN_KILL");
      sendDataToPeers(GAME, {
        game: AVALON,
        nickname,
        peers: action.peers,
        data: action.gameData,
      });
      return {
        ...state,
        winner: action.winner,
        component: action.component,
      };
    }
    case MAIN_VOTE_ONCLICK: {
      console.log("MAIN_VOTE_ONCLICK");
      sendDataToPeers(GAME, {
        game: AVALON,
        nickname,
        peers: action.peers,
        data: action.gameData,
      });
      return { ...state, ...action.gameData };
    }
    case VOTE_ONCLICK: {
      const gameData = { ...state };
      console.log("vote_on_click");
      gameData.voteTurn = action.voteTurn;
      sendDataToPeers(GAME, {
        game: AVALON,
        nickname,
        peers: action.peers,
        data: gameData,
      });
      console.log("sendDataToPeers");
      return {
        ...state,
        ...action.gameData,
      };
    }
    case GAME_CHECK: {
      console.log("GAME_CHECK");
      sendDataToPeers(GAME, {
        game: AVALON,
        nickname,
        peers: action.peers,
        data: action.gameData,
      });
      return { ...state, ...action.gameData };
    }
    case VOTE_RESULT_CHECK: {
      console.log("VOTE_RESULT_CHECK");
      sendDataToPeers(GAME, {
        game: AVALON,
        nickname,
        peers: action.peers,
        data: action.gameData,
      });
      return { ...state, ...action.gameData };
    }
    default:
      return state;
  }
};
export default reducer;
