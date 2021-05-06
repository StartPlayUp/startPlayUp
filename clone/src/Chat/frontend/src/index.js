import React from 'react';
import ReactDOM from 'react-dom';
import './JSC/Css/index.css';
import JSC from './JSC';

ReactDOM.render(
    <React.StrictMode>
        <JSC/>
    </React.StrictMode>,
    document.getElementById('root')
);



// 심플피어 사용해서 정보 받아오고 on.('signal') 이였나
// 받아온 정보로 socket.emit 으로 정보를 넘기고
// 다인 채팅 서버 만들기하면 끝! 간단하다는데 나는 왜 어려워 보이는거야!!

