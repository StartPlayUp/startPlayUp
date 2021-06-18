import Peer from "simple-peer";
import { getDataFromPeer } from "../../receiveFromPeers"
require("dotenv").config()

export const connectDataPeer = ({ socketRef, roomID, peersRef, setPeers, chatListRef, setChatList, myNickname, setPeerData }) => {


    if (Peer.WEBRTC_SUPPORT) {
        // webrtc support!
    } else {
        // fallback
    }

}