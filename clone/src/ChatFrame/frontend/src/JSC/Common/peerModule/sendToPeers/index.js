export const sendDataToPeers = (type, { nickname, data, peers }) => {
    const js = JSON.stringify({ type, nickname, data })
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
