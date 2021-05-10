import Peer from "simple-peer";
export const connectVoicePeer = ({ socketRef, roomID, voicePeersRef, setVoicePeers, myNickname }) => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
        socketRef.current.emit("join voice room", { roomID, myNickname });

        socketRef.current.on("all voice users", users => {
            const peers = [];
            users.forEach(userID => {
                const peer = createPeer(userID, socketRef.current.id, stream);
                voicePeersRef.current.push({
                    peerID: userID,
                    peer,
                    nickname: "",
                });
                peers.push({ peer, nickname: "연결중" });
            });
            setVoicePeers(peers);
        });

        socketRef.current.on("voice user joined", ({ signal, callerID, peerNickname }) => {
            const peer = addPeer(signal, callerID, stream);
            voicePeersRef.current.push({
                peerID: callerID,
                peer,
                nickname: peerNickname,
            })
            console.log("[debug : addPeer : ", voicePeersRef.current);
            setVoicePeers(voicePeersRef.current.map((i) => ({ peer: i.peer, nickname: i.nickname })));
        });

        socketRef.current.on("receiving returned voice signal", ({ id, signal, peerNickname }) => {
            const item = voicePeersRef.current.find(p => p.peerID === id);
            item.peer.signal(signal);
            item.nickname = peerNickname;
            setVoicePeers(voicePeersRef.current.map((i) => ({ peer: i.peer, nickname: i.nickname })));
            console.log("receiving returned voice signal", peerNickname);
        });

        // socketRef.current.on("disconnect voice user", (socketID) => {
        //     console.log(socketID);
        //     console.log("disconnect voice user : ", voicePeersRef.current);
        //     voicePeersRef.current = voicePeersRef.current.filter((i) => i.peerID !== socketID)
        //     console.log("disconnect voice user : ", voicePeersRef.current);
        //     setVoicePeers(voicePeersRef.current.map((i) => ({ peer: i.peer, nickname: i.nickname })));
        // });

    }).catch((e) => console.log(e));

    function createPeer(userToSignal, callerID, stream) {
        //처음 webrtc를 연결할 때 이미 방에 연결되어있는 피어 추가
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
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
            socketRef.current.emit("sending voice signal", { userToSignal, callerID, signal, myNickname })
        })
        // connectVoiceRef({ peer, voiceRef });
        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        // webrtc연결 후 추가적인 인원이 들어올때 피어 추가
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
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
            socketRef.current.emit("returning voice signal", { signal, callerID, myNickname })
        });
        peer.signal(incomingSignal);
        // connectVoiceRef({ peer, voiceRef });
        return peer;
    }

    const connectVoiceRef = ({ peer, voiceRef }) => {
        // 음성 채팅 추가 부분. 
        peer.on("stream", stream => {
            console.log("[debug] : voiceRef");
            if ("srcObject" in voiceRef.current) {
                console.log("voiceRef", voiceRef.current)
                voiceRef.current.srcObject = stream;
            }
        });
    }
}