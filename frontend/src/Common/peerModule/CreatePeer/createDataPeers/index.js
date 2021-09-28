import Peer from "simple-peer";
import { getDataFromPeer } from "../../receiveFromPeers"
require("dotenv").config()

export const connectDataPeer = ({ socketRef, roomID, peersRef, setPeers, myNickname, setPeerData }) => {
    socketRef.current.emit("join room", { roomID, myNickname });
    socketRef.current.on("Duplicate ID", users => {
        return false;
    })
    socketRef.current.on("all users", users => {
        try {
            const peers = [];
            users.forEach(userID => {
                const peer = createPeer(userID, socketRef.current.id);
                peersRef.current.push({
                    peerID: userID,
                    peer,
                    nickname: "",
                });
                peers.push({ peer, nickname: "연결중" });
            });
            setPeers(peers);
        }
        catch (error) {
            console.log(error)
        }
    });

    socketRef.current.on("user joined", ({ signal, callerID, peerNickname }) => {
        try {
            const peer = addPeer(signal, callerID);
            peersRef.current.push({
                peerID: callerID,
                peer,
                nickname: peerNickname,
            })
            console.log("[debug : addPeer : ", peersRef.current);
            setPeers(peersRef.current.map((i) => ({ peer: i.peer, nickname: i.nickname })));
        }
        catch (error) {
            console.log(error)
        }
    });

    socketRef.current.on("receiving returned signal", ({ id, signal, peerNickname }) => {
        try {
            const item = peersRef.current.find(p => p.peerID === id);
            item.peer.signal(signal);
            item.nickname = peerNickname;
            setPeers(peersRef.current.map((i) => ({ peer: i.peer, nickname: i.nickname })));
            console.log("receiving returned signal", peerNickname);
        } catch (error) {
            console.log(error);
        }
    });

    socketRef.current.on("disconnect user", (socketID) => {
        try {
            console.log(socketID);
            console.log("disconnect user : ", peersRef.current);
            peersRef.current = peersRef.current.filter((i) => i.peerID !== socketID)
            console.log("disconnect user : ", peersRef.current);
            setPeers(peersRef.current.map((i) => ({ peer: i.peer, nickname: i.nickname })));
        }
        catch (error) {
            console.log(error)
        }
    });
    function createPeer(userToSignal, callerID) {
        //처음 webrtc를 연결할 때 이미 방에 연결되어있는 피어 추가
        const peer = new Peer({
            initiator: true,
            trickle: false,
            iceServers: [
                {
                    urls: process.env.STUN_DOMAIN,
                },
                {
                    urls: process.env.TURN_DOMAIN,
                    username: process.env.TURN_ID,
                    credential: process.env.PASSWORD
                }
            ],
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal, myNickname })
        })
        getDataFromPeer({ peer, setPeerData });
        // peer.on('close', () => console.log("peer close"));
        return peer;
    }

    function addPeer(incomingSignal, callerID) {
        // webrtc연결 후 추가적인 인원이 들어올때 피어 추가
        const peer = new Peer({
            initiator: false,
            trickle: false,
            iceServers: [
                {
                    urls: process.env.STUN_DOMAIN,
                },
                {
                    urls: process.env.TURN_DOMAIN,
                    username: process.env.TURN_ID,
                    credential: process.env.PASSWORD
                }
            ],
        });

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID, myNickname })
        });

        peer.signal(incomingSignal);
        getDataFromPeer({ peer, setPeerData });
        // peer.on('close', () => console.log("peer close"));
        return peer;
    }
}