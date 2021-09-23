
const { isString, isObject, isBoolean, isArray } = require('../Constant/checkTypeOrEmpty');
const deleteRoom = async ({ db, roomId }) => {
    if (isString(roomId)) {
        const result = await db.collection('rooms').doc(roomId).delete();
        console.log(result)
    }
    else {
        console.error("deleteRoom error");
    }
}

const deleteUser = async ({ db, email }) => {
    if (isString(email)) {
        const result = await db.collection('users').doc(email).delete();
        console.log("deleteUser : ", result._writeTime)
    }
    else {
        console.error("deleteUser error");
    }
}

module.exports = { deleteRoom, deleteUser }