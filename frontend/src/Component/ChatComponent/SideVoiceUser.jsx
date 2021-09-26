import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components'

const ConnectUsers = styled.div`
    display:flex;
    flex-direction:column;
    flex-basis:100px;
    overflow:hidden;
    text-overflow:ellipsis;
    flex-grow:0;
`;
const PeersList = styled.div`
    overflow:hidden;
    text-overflow:ellipsis;
    border:1px solid gray;
    margin:1px;
`;

const App = ({ peers }) => {
    return (
        <ConnectUsers>
            {peers.map((i) => <PeersList key={i.peer}>{i.nickname.split(' ')[0]}</PeersList>)}
        </ConnectUsers>
    )
}

export default memo(App);
