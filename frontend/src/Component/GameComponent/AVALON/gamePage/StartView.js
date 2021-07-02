// import React from "react";
// import gameSetting, {expandRoles, mustHaveRoles, needPlayers} from "../gameSetting";
// import {createStore} from "redux";
// import shuffle from "lodash.shuffle";
//
// function StartView() {
//     const playerLengthSelect = () => {
//         switch (Players.length) {
//             case 5 :
//                 Games.takeStage = needPlayers._5P;
//                 break;
//             case 6:
//                 Games.takeStage = needPlayers._6P;
//                 break;
//             case 7:
//                 Games.takeStage = needPlayers._7P;
//                 break;
//             case 8:
//             case 9:
//             case 10:
//                 Games.takeStage = needPlayers._8to10P;
//                 break;
//             default:
//                 alert('error');
//         }
//     }
//
//     const gameStart = () => {
//         const playerLength = Players.length;
//         if (playerLength >= 5) {
//             const temp = [
//                 ...mustHaveRoles,
//                 ...expandRoles.slice(0, playerLength - 5),
//             ];
//             const roles = shuffle(temp);
//             // eslint-disable-next-line array-callback-return
//             Players.map((user, index) => {
//                 user.role = roles[index];
//             });
//             // setPage(MAIN_FRAME) reducer 를 통해서 변경
//         } else {
//             alert('error')
//         }
//     }
// }
// export default StartView