
const { isString, isObject, isBoolean, isArray, isNotObjectEmpty } = require('../Constant/checkTypeOrEmpty');
const getListOfRooms = async ({ db }) => {
    const result = await db.collection('rooms').get()
    const resultIsEmpty = result.empty
    const roomList = result.docs.map(doc => {
        const { password, ...e } = doc.data();
        return { ...e, roomId: doc.id }
    })
    return { roomList, success: resultIsEmpty };
}

// const getDataOfRoom = async ({ db, roomId }) => {
//     let success = false;
//     let result = {};
//     if (isString(roomId)) {
//         result = await db.collection('rooms').listCollections();
//         if (isNotObjectEmpty(result)) {
//             success = true;
//         }
//         console.log("get rooms : ", result)
//     }
//     else {
//         console.error("getRooms error");
//     }
//     return [result, success];
// }

const getUserFromEmail = async ({ db, email }) => {
    let success = false;
    let result = {};
    if (isString(email)) {
        const userRef = db.collection('email')
        result = await userRef.where('email', "==", email)
        if (isNotObjectEmpty(result)) {
            success = true;
        }
        // console.log("get users : ", result)
    }
    else {
        console.error("getUserFromId error");
    }
    return { userList: result, success };
}
module.exports = { getListOfRooms, getUserFromEmail }