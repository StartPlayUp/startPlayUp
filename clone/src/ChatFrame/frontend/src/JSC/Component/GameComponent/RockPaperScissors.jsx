import React, { useContext, useState, memo } from 'react';
import { PeerDataContext, PeersContext, UserContext } from '../../store';
import scissors from './../../image/가위.jpg'
import rock from './../../image/바위.jpg'
import paper from './../../image/보.jpg'
import styled from "styled-components"
import { PEER_ROCK_PAPER_SCISSORS } from "../../Constants/peerDataTypes";
import { sendDataToPeers } from '../../Common/peerModule/sendToPeers'

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
    const { peerData, setpeerData } = useContext(PeerDataContext);
    const { user } = useContext(UserContext);
    const [selectData, setSelectData] = useState("");
    const { peers } = useContext(PeersContext);


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
        success = sendDataToPeers(PEER_ROCK_PAPER_SCISSORS, { nickname: user, data: tmp, peers });
        success === true && peers.length && setSelectData(tmp);
    }
    const PrintResult = () => {
        const differnceOfData = RockPaperScissorsData[selectData][0] - RockPaperScissorsData[peerData][0];
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
            {(peerData === undefined || selectData === "") && <div>상대가 선택하지 않았거나 본인이 선택하지 않음.</div>}
            {(peerData !== undefined && selectData !== "") && <div>상대가 낸 것 : {peerData}</div>}
            {selectData === "" && <div>본인 아직 선택 안함.</div>}
            {selectData !== "" && <div>본인이 낸 것 : {selectData}</div>}
            {
                Object.values(RockPaperScissorsData).map((i) => {
                    return <ImageButton key={i[1]} onClick={() => selectDataHandler(i[0])}>
                        <Img src={i[1]} />
                    </ImageButton>
                })
            }
            {(peerData !== undefined && selectData !== "") && <PrintResult />}
        </GameField >
    )
}
export default memo(App);