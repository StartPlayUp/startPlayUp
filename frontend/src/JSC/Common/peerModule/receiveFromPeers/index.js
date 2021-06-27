export const getDataFromPeer = ({ peer, setPeerData }) => {
    peer.on('data', jsonData => {
        const { type, nickname, game, data } = JSON.parse(jsonData);
        console.log("getDataFromPeer", { type, nickname, game, data })
        setPeerData({ type, nickname, game, data });
    });
}//여기서 데이터를 받는다,셋피어 데이터에 넣는다