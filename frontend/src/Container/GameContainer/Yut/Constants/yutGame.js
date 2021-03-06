export const YUT_INITIAL_STATE = {
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
    // timer: 0, // 1초에 +1 씩 더해준다.
    myThrowCount: 1, // 윷을 던질 수 있는 횟수를 나타냄. // halted 와 useEffect 사용해서 대체할 수 있는지 테스트 //
    winner: [], // 이긴사람을 순서대로 추가함.
};

// 플레이어 색
export const YUT_PLAYER_COLOR = ['#FF0000', '#7bd3f7', '#FFA500', '#98ff98']

// 윷 타입
export const YUT_RESULT_TYPE = {
    BACK_DO: 0,
    DO: 1,
    GAE: 2,
    GIRL: 3,
    YUT: 4,
    MO: 5,
}

export const NUMBER_TO_MATCH_YUT_TYPE = {
    0: YUT_RESULT_TYPE.MO, // 모 
    1: YUT_RESULT_TYPE.DO, // 도 1
    2: YUT_RESULT_TYPE.GAE, // 개 2
    3: YUT_RESULT_TYPE.GIRL, // 걸 3 
    4: YUT_RESULT_TYPE.YUT  // 윷 4
    // 0 : 백도
}

export const NUMBER_TO_MATCH_KOREA_YUT_TYPE = {
    0: "백도",
    1: "도",
    2: "개",
    3: "걸",
    4: "윷",
    5: "모",
}


export const DEFAULT_TIME_VALUE = 30;


export const DEFAULT_FIELD_VALUE = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]


export const GRID_TABLE = [
    { index: 0, row: 20, column: 20, rotateValue: 0 },
    { index: 1, row: 20, column: 16, rotateValue: 0 },
    { index: 2, row: 20, column: 12, rotateValue: 0 },
    { index: 3, row: 20, column: 8, rotateValue: 0 },
    { index: 4, row: 20, column: 4, rotateValue: 0 },
    { index: 5, row: 20, column: 0, rotateValue: 225 },
    { index: 6, row: 16, column: 0, rotateValue: 270 },
    { index: 7, row: 12, column: 0, rotateValue: 270 },
    { index: 8, row: 8, column: 0, rotateValue: 270 },
    { index: 9, row: 4, column: 0, rotateValue: 270 },
    { index: 10, row: 0, column: 0, rotateValue: 135 },
    { index: 11, row: 0, column: 4, rotateValue: 180 },
    { index: 12, row: 0, column: 8, rotateValue: 180 },
    { index: 13, row: 0, column: 12, rotateValue: 180 },
    { index: 14, row: 0, column: 16, rotateValue: 180 },
    { index: 15, row: 0, column: 20, rotateValue: 90 },
    { index: 16, row: 4, column: 20, rotateValue: 90 },
    { index: 17, row: 8, column: 20, rotateValue: 90 },
    { index: 18, row: 12, column: 20, rotateValue: 90 },
    { index: 19, row: 16, column: 20, rotateValue: 90 },
    { index: 20, row: 20, column: 20, rotateValue: 0 },
    { index: 21, row: 16, column: 4, rotateValue: 225 },
    { index: 22, row: 13, column: 7, rotateValue: 225 },
    { index: 23, row: 10, column: 10, rotateValue: 135 },
    { index: 24, row: 7, column: 13, rotateValue: 225 },
    { index: 25, row: 4, column: 16, rotateValue: 225 },
    { index: 26, row: 4, column: 4, rotateValue: 135 },
    { index: 27, row: 7, column: 7, rotateValue: 135 },
    { index: 28, row: 13, column: 13, rotateValue: 135 },
    { index: 29, row: 16, column: 16, rotateValue: 135 },
    { index: 30, row: 16, column: 10, rotateValue: 0 },
]

export const SHORTCUT_PLACE = [5, 10, 15, 23, 20];