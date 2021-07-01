import React, { useContext, useState, memo, useEffect } from 'react';
import { PeerDataContext, PeersContext, UserContext } from 'JSC/store';
import scissors from "JSC/image/가위.jpg"
import rock from 'JSC/image/바위.jpg'
import paper from 'JSC/image/보.jpg'
import styled from "styled-components"
import { GAME, ROCK_PAPER_SCISSORS } from "JSC/Constants/peerDataTypes";
import { sendDataToPeers } from 'JSC/Common/peerModule/sendToPeers'

const ImageButton = styled.button`
    width: 100px;
    height: 100px;
`;

const Img = styled.img`
    width: 100px;
    height: 100px;
`;

const GameField = styled.div`
    background:white;
`;

const App = () => {
    const RockPaperScissorsData = {
        'scissors': [1, scissors],
        'rock': [0, rock],
        'paper': [-1, paper],
    };


    const { peerData } = useContext(PeerDataContext);
    // const { user } = useContext(UserContext);
    const [selectData, setSelectData] = useState("");
    const [enemyData, setEnemyData] = useState();
    const { peers } = useContext(PeersContext);

    useEffect(() => {
        if (peerData.type === GAME && peerData.game === ROCK_PAPER_SCISSORS) {
            setEnemyData(peerData.data);
        }
    }, [peerData])

    const selectDataHandler = (data) => {
        let tmp;
        let success = undefined;
        if (data === 1) {
            tmp = "scissors"
        }
        else if (data === 0) {
            tmp = "rock"
        }
        else {
            tmp = "paper"
        }
        success = sendDataToPeers(GAME, { game: ROCK_PAPER_SCISSORS, nickname: localStorage.getItem('nickname'), data: tmp, peers });
        success === true && peers.length && setSelectData(tmp);
    }
    const PrintResult = () => {
        console.log("",)
        const differnceOfData = RockPaperScissorsData[selectData][0] - RockPaperScissorsData[enemyData][0];
        let result = "";
        if (differnceOfData === 0) {
            result = "비김"
        }
        else if ([-1, 2].includes(differnceOfData)) {
            result = '이김'
        }
        else {
            result = '짐'
        }
        return <div>결과는 : {result}</div>
    }


    return (
        <GameField>
            {(enemyData === undefined || selectData === "") && <div>상대가 선택하지 않았거나 본인이 선택하지 않음.</div>}
            {(enemyData !== undefined && selectData !== "") && <div>상대가 낸 것 : {enemyData}</div>}
            {selectData === "" && <div>본인 아직 선택 안함.</div>}
            {selectData !== "" && <div>본인이 낸 것 : {selectData}</div>}
            {
                Object.values(RockPaperScissorsData).map((i) => {
                    return <ImageButton key={i[1]} onClick={() => selectDataHandler(i[0])}>
                        <Img src={i[1]} />
                    </ImageButton>
                })
            }
            {(enemyData !== undefined && selectData !== "") && <PrintResult />}
        </GameField >
    )
}
export default memo(App);