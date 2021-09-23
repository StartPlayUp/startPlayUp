const axios = require('axios');

// axios 인자로 들어감
const getRoomsConfig = {
    method: 'get',
    url: 'localhost::4000/getRooms',
    headers: {}
};

//post 데이터 추가
const createRoomConfig = {
    method: 'post',
    url: 'localhost::4000/createRoom',
    data: {
        hostname: "테스트",
        guestList: [],
        roomTitle: "테스트트트트",
        gameType: "yut",
        play: false,
        secret: false,
        password: "asdfqwer",
        roomLimit: 0,
    }
};

const checkUserEmailConfig = {
    method: 'get',
    url: 'localhost::4000/checkUser?email=test2@gmail.com',
}

const getRooms = () => {
    //axios 연결 되면 then , 아니면 catch
    axios(getRoomsConfig)
        .then(function (response) {
            console.log("방 목록 가져오기 : ", response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const createRoom = () => {
    axios(createRoomConfig)
        .then(function (response) {
            console.log("생성 id: ", response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const checkUserEmail = () => {
    axios(checkUserEmailConfig)
        .then(function (response) {
            console.log("해당 이메일로 가입한 사람 있는지 확인 : ", response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}


getRooms();
// createRoom();
// checkUserEmail();
