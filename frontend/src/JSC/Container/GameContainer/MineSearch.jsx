import React, { useReducer, useEffect, createContext, useMemo, memo, useContext } from 'react';
import Table from 'JSC/Component/GameComponent/MineSearch/Table';
import Form from 'JSC/Component/GameComponent/MineSearch/Form';
import styled from 'styled-components';
import { GAME, MINE_SEARCH } from 'JSC/Constants/peerDataTypes';
import { PeerDataContext, PeersContext, UserContext } from 'JSC/store';
import { sendDataToPeers } from 'JSC/Common/peerModule/sendToPeers';

export const UPDATE_TIMER = 'UPDATE_TIMER';
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const SEND_GAME_DATA = 'SEND_GAME_DATA';


export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0이상이면 다 OPEN으로
}

export const TableContext = createContext({
    tableData: [],
    halted: false,
    dispatch: () => { }
});

const initialState = {
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    halted: true,
    tableData: [],
    timer: 0,
    result: '',
    openedCount: 0,
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((v, index) => index);
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
        shuffle.push(chosen)
    }

    let data = Array(row).fill().map(() => {
        console.log("row ", row);
        return (
            Array(cell).fill().map(() => {
                console.log("cell ", cell);
                return CODE.NORMAL
            })
        )
    })
    console.log(data)
    console.log(shuffle)
    shuffle.map((v, index) => {
        const ver = Math.floor(v / cell);
        const hor = v % cell;
        data[ver][hor] = CODE.MINE;
    })
    console.log(data);
    return data;

}




const reducer = (state, action) => {
    // const { user } = useContext(UserContext);
    const { peers } = useContext(PeersContext);
    const nickname = localStorage.getItem('nickname');
    switch (action.type) {
        case "GetDataFromPeer": {
            return {
                ...state,
                tableData: action.tableData,
                data: action.data,
                timer: 0,
                halted: action.halted,
                openedCount: 0,
            }
        }


        case START_GAME: {
            // const arrayRowCell = [action.row].map(v => {
            //     Array(action.cell).fill(0);
            // });
            const tableObject = {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine,
                },
                timer: 0,
                halted: false,
                openedCount: 0,
            }
            // sendDataToPeers(GAME_MINE_SEARCH, { nickname: action.nickname, data: { tableData: tableObject.tableData, data: tableObject.data, halted: tableObject.halted }, peers: action.peers });
            sendDataToPeers(GAME, { game: MINE_SEARCH, nickname, data: { tableData: tableObject.tableData, data: tableObject.data, halted: tableObject.halted }, peers });

            return tableObject
        }
        case OPEN_CELL: {
            const tableData = [...state.tableData]
            const checked = [];
            let openedCount = 0;
            const checkAround = (row, cell) => {
                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
                    return;
                } // 상하좌우 없는칸은 안 열기
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    return;
                } // 닫힌 칸만 열기
                if (checked.includes(row + '/' + cell)) {
                    return;
                } else {
                    checked.push(row + '/' + cell);
                } // 한 번 연칸은 무시하기

                let around = [
                    tableData[row][cell - 1],
                    tableData[row][cell + 1]
                ];
                if (tableData[row - 1]) {
                    around = around.concat(
                        [tableData[row - 1][cell - 1],
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1]])
                }
                if (tableData[row + 1]) {
                    around = around.concat(
                        [tableData[row + 1][cell - 1],
                        tableData[row + 1][cell],
                        tableData[row + 1][cell + 1]])
                }

                // around.map((v, i) => {
                //     if ([CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE].includes(v)) count++;
                // })
                const count = around.filter(function (v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                }).length;
                if (count === 0) { // 주변칸 오픈
                    if (row > -1) {
                        const near = [];
                        if (row - 1 > -1) {
                            near.push([row - 1, cell - 1]);
                            near.push([row - 1, cell]);
                            near.push([row - 1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        if (row + 1 < tableData.length) {
                            near.push([row + 1, cell - 1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }
                        near.forEach((n) => {
                            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                                checkAround(n[0], n[1]);
                            }
                        })
                    }
                }
                if (tableData[row][cell] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
                    openedCount += 1;
                }
                tableData[row][cell] = count;
            }
            checkAround(action.row, action.cell, tableData.length);
            let halted = false;
            let result = '';
            console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount);
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { // 승리
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다`;
            }

            const data = {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted: halted,
                result: result,
            }

            sendDataToPeers(GAME, {
                game: MINE_SEARCH,
                nickname,
                data,
                peers
            })

            return data;

        }
        case CLICK_MINE: {
            const tableData = [...state.tableData]
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            }
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            //tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            }
            else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData
            }
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            //tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            }
            else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData
            }
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            //tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            }
            else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData
            }
        }
        case UPDATE_TIMER: {

            return {
                ...state,
                timer: (state.timer + 1)
            }
        }
        case SEND_GAME_DATA: {

            return;
        }
        default:
            return state;
    }
}
const StyledDivMine = styled.div`
    display:flex;
    flex-direction:column;
`;

const StyledTable = styled(Table)`
    width:400px;
    height:400px;
    margin:10px;
`;

const MineSearch = (props,) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { peerData } = useContext(PeerDataContext);
    const { tableData, halted, timer, result } = state;

    const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);

    useEffect(() => {
        let timer;
        if (halted === false) {
            timer = setInterval(() => {
                dispatch({ type: UPDATE_TIMER })
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [halted])

    useEffect(() => {
        if (peerData.type === GAME && peerData.game === MINE_SEARCH) {
            const { tableData, data, halted } = peerData.data;
            dispatch({ type: "GetDataFromPeer", tableData, data, halted })
        }
    }, [peerData])

    return (
        <div>
            <TableContext.Provider value={value}>
                <Form />
                <div>{timer}</div>
                <StyledTable />
                <div>{result}</div>
            </TableContext.Provider>
        </div>
    )
}

export default MineSearch;
