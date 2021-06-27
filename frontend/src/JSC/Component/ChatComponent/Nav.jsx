import React,{memo} from 'react';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose, faWindowMaximize, faWindowMinimize} from "@fortawesome/free-solid-svg-icons";

const Window = styled(FontAwesomeIcon)`
  margin:10px;
  font-size:30px;
  &:hover{
    cursor:pointer;
  }
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  background-color: white;
  border-bottom: 3px solid #ececec;
  height:50px;
  width: inherit;
  & div .windowButton{
      margin:5px;
  }  
`;

const Users = styled.div`

`;

const WindowIcons = styled.div`
    display:flex;
    flex-direction: row;
    width:30%;
    justify-content: flex-end;
`;


function Nav() {
    const windowIcons = [faWindowMinimize, faWindowMaximize, faWindowClose];
    return (
        <div>
            <Navbar id="nav" className="nav">
                <Users/>
                <WindowIcons>{windowIcons.map((i) => <Window key={i.iconName + "-Nav"} icon={i}/>)}</WindowIcons>
            </Navbar>
        </div>
    );
}

export default memo(Nav);
