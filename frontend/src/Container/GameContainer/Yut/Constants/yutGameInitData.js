export const initialState = {
    playerData: [
        //      (예시)
        //     { nickname: '장석찬', color: 'red', horses: 4, goal: 0 },
        //     { nickname: '정진', color: 'orange', horses: 4, goal: 0 },
        //     { nickname: '이종찬', color: 'blue', horses: 4, goal: 0 },
        //     { nickname: '조석영', color: 'green', horses: 4, goal: 0 },
    ], // 몇번 칸에 누구 말이 몇개 있는지 알 수 있음.
    nowTurn: { index: 0, nickname: '' },
    // horsePosition: { 2: { player: 0, horses: 2 } },
    playerHorsePosition: [], // 4명일 때 [{2:2},{},{},{}]
    halted: true, // 내 순서 일때 false 그 외에는 true (정지)
    yutData: [], // 윷을 던졌을때 윷 또는 모가 나오거나, 상대 말을 잡을 때 추가
    selectHorse: -1, // 현재 선택한 말.
    placeToMove: {},
    timer: 0, // 1초에 +1 씩 더해준다.
    myThrowCount: 1, // 윷을 던질 수 있는 횟수를 나타냄. // halted 와 useEffect 사용해서 대체할 수 있는지 테스트 //
    winner: [], // 이긴사람을 순서대로 추가함.
    lastYutData: [0, 0, 0, 0],
};

// 플레이어 색
export const YUT_PLAYER_COLOR = ['red', '#7bd3f7', 'orange', '#98ff98']

// 윷 타입
export const YUT_RESULT_TYPE = {
    BACK_DO: 0,
    DO: 1,
    GAE: 2,
    GIRL: 3,
    YUT: 4,
    MO: 5,
}

export const NUMBER_TO_YUT_TYPE = {
    0: "백도",
    1: "도",
    2: "개",
    3: "걸",
    4: "윷",
    5: "모",
}
