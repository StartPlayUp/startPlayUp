const admin = require('firebase-admin');
const { checkRoomStructure, checkUsersStructure } = require('../Constant/checkStructure');

const createRoom = async ({ db, room }) => {
    try {
        if (checkRoomStructure(room)) {
            const {
                hostname,
                guestList,
                roomTitle,
                gameType,
                play,
                secret,
                password,
                roomLimit,
            } = room;
            const FieldValue = admin.firestore.FieldValue;
            const res = db.collection("rooms");
            const addReturn = await res.add({
                hostname,
                guestList,
                roomTitle,
                gameType,
                play,
                secret,
                password,
                roomLimit,
                timestamp: FieldValue.serverTimestamp()
            })
            return { roomId: addReturn.id, success: true };
        } else {
            return { roomId: "", success: false };
        }
    }
    catch {
        console.error("createRoom catch error");
        console.log(error)
    }
}

const createUser = async ({ db, user }) => {
    if (checkUsersStructure(user)) {
        const {
            nickname,
            email,
            password,
            numberOfGames,
            report,
        } = user;
        const FieldValue = admin.firestore.FieldValue;
        const res = db.collection("users").doc(user.email);
        const setReturn = await res.set({
            nickname,
            email,
            password,
            numberOfGames,
            report
        });
        const updateReturn = await res.update({ timestamp: FieldValue.serverTimestamp() })
        console.log(setReturn, updateReturn)
    }
    else {
        console.error("createUsersArgumentCheck error");
    }
}

module.exports = { createRoom, createUser }