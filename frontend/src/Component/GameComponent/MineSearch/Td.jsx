import React, { useContext, memo, useCallback } from 'react';
import { CODE, TableContext, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, SEND_GAME_DATA } from 'JSC/Container/GameContainer/MineSearch';
import styled from "styled-components";

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE: {
            return {
                background: '#444'
            };
        }
        case CODE.CLICKED_MINE:
        case CODE.OPENED: {
            return {
                background: 'white'
            }
        }
        case CODE.FLAG_MINE:
        case CODE.FLAG: {
            return {
                background: 'red'
            }
        }
        case CODE.QUESTION_MINE:
        case CODE.QUESTION: {
            return {
                background: 'yellow'
            }
        }
        default:
            return {
                background: 'white'
            }
    }
}

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL: {
            return ''
        }
        case CODE.MINE: {
            return "";
        }
        case CODE.CLICKED_MINE: {
            return '붐'
        }
        case CODE.FLAG_MINE:
        case CODE.FLAG: {
            return '!';
        }
        case CODE.QUESTION_MINE:
        case CODE.QUESTION: {
            return '?';
        }
        default: {
            return code || '';
        }
    }
}



const StyledTd = styled.td`
    display:flex;
    justify-content:space-between;
`;

const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        console.log(tableData[rowIndex][cellIndex]);
        if (halted === true) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL: {
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            }
            case CODE.MINE: {
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex })
                return;
            }
            default: return;
        };
        dispatch({ type: SEND_GAME_DATA });
    }, [tableData[rowIndex][cellIndex], halted]);
    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if (halted === true) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE: {
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex })
                return;
            }
            case CODE.FLAG_MINE:
            case CODE.FLAG: {
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex })
                return
            }
            case CODE.QUESTION_MINE:
            case CODE.QUESTION: {
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex })
                return
            }
            default: return;
        }
    }, [tableData[rowIndex][cellIndex], halted])
    //console.log(tableData);
    return (
        <td style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}>
            {getTdText(tableData[rowIndex][cellIndex])}
        </td >
    )
})

export default Td;