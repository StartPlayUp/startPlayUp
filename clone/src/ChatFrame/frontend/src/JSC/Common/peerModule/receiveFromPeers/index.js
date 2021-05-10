import {chatAddMessageRef} from "../../ChatModule/addMessage"
import {PEER_ROCK_PAPER_SCISSORS, PEER_CHAT} from "../../../Constants/peerDataTypes";

export const getDataFromPeerOn = ({peer, chatListRef, setChatList, setPeerData}) => {
    peer.on('data', jsonData => {
        const {type, nickname, data} = JSON.parse(jsonData)
        switch (type) {
            case PEER_CHAT:
                chatAddMessageRef({nickname, inputMessage: data, chatListRef, setChatList});
                break;
            case PEER_ROCK_PAPER_SCISSORS:
                setPeerData(data);
                break;
            default:
                return;
        }
    });
}