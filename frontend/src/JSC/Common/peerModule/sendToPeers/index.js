export const sendDataToPeers = (type, { game, nickname, data, peers }) => {
    const js = JSON.stringify({ type, game, nickname, data })
    let success = false;
    try { // 
        peers === undefined || peers.forEach(p => {
            console.log("[debug] sendDataToPeers ")
            p.peer.write(js);
        });
        success = true;

    } catch (e) {
        success = false;
        console.error(e.name + ': ' + e.message)
    }
    return success
}
