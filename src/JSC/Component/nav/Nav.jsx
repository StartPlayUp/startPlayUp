import React from 'react';
import styled from "styled-components";
import peopleImg from "../../icon/peoplePhoto.jpg"

const Img = styled.img`
  margin:10px;
  
  //프로필 사진 css 인데 일단 안씀. 2021-03-30
  //&:nth-child(1){ 
  //  width:30px;
  //  height:30px;
  //  z-index: 2;
  //  border-radius: 10px;
  //  box-shadow: 0.2px 0.2px 0.1px 0.1px rgba(163, 167, 162, 0.774); /*그림자 만들기*/
  //}
  //&:nth-child(2){
  //  position:absolute;
  //  width:30px;
  //  height:30px;
  //  z-index: 3;
  //  border-radius: 10px;
  //  left:25px;
  //  top:25px;
  //  box-shadow: 0.2px 0.2px 0.1px 0.1px rgba(163, 167, 162, 0.774); /*그림자 만들기*/
  //}
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction:row;
  background-color: white;
  border-bottom: 3px solid #ececec;
  //position: fixed; /* 대체 없음 */
  //top:0;
  height:50px;
  //z-index : 1;
  width: inherit;
  & div .windowButton{
      margin:5px;
  }  
`;


function Nav() {
    return (
        <div>
            <Navbar id="nav" className="nab">
                <div className="navProfiles">
                </div>
                <div className="navTitle navAttribute"/>
                <div className="windowButton navAttribute"/>
            </Navbar>
        </div>
    );
}

export default Nav;
