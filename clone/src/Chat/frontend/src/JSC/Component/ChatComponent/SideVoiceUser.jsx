import React, {memo, useEffect, useRef, useState} from 'react';
import styled from 'styled-components'
import Peer from "simple-peer";
import io from "socket.io-client"

const Side = styled.div`
    height:${props => props.width || 600}px;
    width:${props => props.width || 100}px;
    margin-top:10px;
    margin-bottom:10px;
    padding:0px 5px 0px 5px;
`;
const Users = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledAudio = styled.audio`
    height: 40%;
    width: 50%;
`;

const Audio = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledAudio playsInline autoPlay ref={ref}/>
    );
}

const App = ({socketRef}) => {
    const [peers, setPeers] = useState([]);
    // const socketRef = useRef();
    let peersRef = useRef([]);
    const roomID = "9a06eb80-9fd4-11eb-a3e2-377a237cffe7";

    useEffect(() => {
        // socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({video: false, audio: true}).then(stream => {
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })
                console.log("[debug : addPeer : ", peersRef.current);
                setPeers(users => {
                    console.log("users : ", users);
                    return [...users, peer]
                });
            });

            socketRef.current.on("receiving returned signal", ({id, signal}) => {
                const item = peersRef.current.find(p => p.peerID === id);
                item.peer.signal(signal);
            });

            socketRef.current.on("disconnect user", (socketID) => {
                console.log(socketID);
                console.log("disconnect user : ", peersRef.current);
                peersRef.current = peersRef.current.filter((i) => i.peerID !== socketID)
                console.log("disconnect user : ", peersRef.current);
                setPeers(peersRef.current.map((i) => i.peer));
            });
        })
    }, []);

    useEffect(() => {
        console.log("useEffect : ", peers);
        return
    }, [peers]);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", {userToSignal, callerID, signal})
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", {signal, callerID})
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <div>
            {peersRef.current.map((i) => <div key={i + "sideVoiceUser"}>{i.peerID}</div>)}
            {peers.map((i, index) => (
                <Audio key={index} peer={i}/>
            ))}
        </div>
    )
}

export default memo(App);
