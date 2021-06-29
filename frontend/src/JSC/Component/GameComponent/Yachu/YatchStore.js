import React, { useReducer, useState, useEffect, useContext } from "react";
import Calculate from "./calculate";
import { sendDataToPeers } from 'JSC/Common/peerModule/sendToPeers/index.js';
import { PeerDataContext, PeersContext, UserContext } from 'JSC/store';
import { GAME, YACHT } from 'JSC/Constants/peerDataTypes.js';
import dice1 from './dice/dice1.png';
import styled from 'styled-components';

const YachuStore=()=>{
    
}