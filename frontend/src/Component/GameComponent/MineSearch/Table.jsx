import React, { useContext, memo } from 'react';
import Tr from './Tr';
import { TableContext } from 'JSC/Container/GameContainer/MineSearch';
import styled from "styled-components";

const StyledTable = styled.table`
    width:400px;
    height:400px;
    display:table;
`;

const StyledTbody = styled.tbody`
    height:inherit;
    width:inherit;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`;


const Table = memo(() => {
    const { tableData } = useContext(TableContext);
    return (
        <StyledTable>
            <tbody className="main_board">
                {Array(tableData.length).fill().map((tr, i) => <Tr key={i} rowIndex={i} />)}
            </tbody>
        </StyledTable>
    )
})

export default Table;