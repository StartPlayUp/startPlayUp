import React, {memo, useState} from 'react';
import styled from "styled-components";
import voicetalk from "../../icon/voicetalk.svg";
import {sendDataToPeers} from '../../Common/peerModule/sendToPeers'
import {chatAddMessage} from "../../Common/ChatModule/addMessage"
import {PEER_CHAT} from "../../Constants/peerDataTypes";

// import { SEND_MESSAGE, socketApi } from "../../Common/socketModule";

const SendChat = styled.div`
   border-top: 3px solid #ececec;
   height : inherit;
   width:inherit;
   background-color : white;
   // background-color: rgb(255, 255, 255);
`;

const FieldSet = styled.div`
    display:flex;
    flex-direction: row;
    justify-content : space-between;
`;

const FieldInput = styled.input`
    width:100%;
    height:30px;
    border:2px solid #ececec; 
    border-radius : 12px;
    margin:5px 10px 5px 10px;
    outline-style: none;
`;

const FieldSetBtn = styled.button`
    margin:10px;
    display:flex;
    align-items: center; /* 세로축 중앙 가로축 중앙 맞춤*/
    justify-content: center;
    width:60px;
    height:25px;
    overflow:hidden;
    background-color: ${props => props.disabled === false ? "rgb(208,208,208)" : "rgb(150,150,150)"};
    color:white;
    border:none;
    border-radius: 30px;
    box-shadow: 0.2px 0.2px 0.1px 0.1px rgba(163, 167, 162, 0.774); /*그림자 만들기*/
    cursor:pointer;    
`;


const SendMenuButtons = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-around; /*임시로 크기 정해주고 위치 맞춤*/
    align-items: center;
`;

const SendMenuButton = styled.button`
    border:0;
    outline:0;
    background-color: white;
    cursor: pointer;
    width:20%;
`;