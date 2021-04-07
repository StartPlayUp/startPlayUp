import React from 'react';
import styled from "styled-components";
import WebHeader from '../mainPage/webHeader'

const BodyFrame = styled.div`
    width: 100%;
    height: 100%;
    position : absolute;
`;

const Room = styled.div`
    width: 75%;
    margin : 50px auto;
`

const Title = styled.div`
    display: flex;
    align-items: center;
`

const TitleSpan = styled.span`
    margin-right : 30px;
    font-size : ${(props) => props.fontSize};
    color : ${(props) => props.color};
`
const ButtonArea = styled.div`
    margin-top: 30px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
`

const LeftButtonsArea = styled.div`
    justify-content: flex-start;
`

const RightButtonsArea = styled.div`
    justify-content: flex-end;
`

const Button = styled.button`
    font-size: 14px;
    padding: 7px;
    margin-right : 15px;
`


const MainList = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-top: 30px;
`

const UserList = styled.div`
    flex-basis: 50%;
    flex-direction: column;
`

const ChattingList = styled.div`
    flex-basis: 50%;
    flex-direction: column;
    height: 400px;
    background-color: #FFFFF3;
`

const WaitingRoom = ({children}, ...rest) =>{
    return(

        <div>
            <BodyFrame>
                <WebHeader/>
                <Room>
                    <Title>
                        <TitleSpan fontSize={"18px"} color={"red"}>Mafia</TitleSpan>
                        <TitleSpan fontSize={"22px"} color={"black"}>선착순 8명 빠르게 구해요 ~~~!!</TitleSpan>
                    </Title>
                    <hr/>
                    <ButtonArea>
                        <LeftButtonsArea>
                            <Button>시작</Button>
                            <Button>준비</Button>
                            <Button>관전</Button>
                        </LeftButtonsArea>
                        <RightButtonsArea>
                            <Button>나가기</Button>
                        </RightButtonsArea>
                    </ButtonArea>
                    <MainList>
                        <UserList>

                        </UserList>
                        <ChattingList>

                        </ChattingList>
                    </MainList>
                </Room>
            </BodyFrame>

        </div>
        // <div id="gamePage">
        //     <WebHeader/>
        //     <div id="waitingRoom">
        //         <div id="title">
        //             <span className="gameTitle">Mafia</span>
        //             <span> 선착순 8명 빠르게 구해요 ~~~ !!</span>
        //         </div>
        //         <hr/>
        //         <div id="options">
        //             <div className="optionsLeft">
        //                 <button>시작</button>
        //                 <button>준비</button>
        //                 <button>관전</button>
        //             </div>
        //             <div className="optionsRight">
        //                 <button>나가기</button>
        //             </div>
        //         </div>
        //         <hr/>
        //         <div id="list">
        //             <div className="users-list">
        //                 <h3>userName / ready-state / kickout</h3>
        //                 <h3>userName / ready-state / kickout</h3>
        //                 <h3>userName / ready-state / kickout</h3>
        //                 <h3>userName / ready-state / kickout</h3>
        //             </div>
        //             <div className="chatting-list">
        //                 <h1>chatting list</h1>
        //                 <h1>chatting list</h1>
        //                 <h1>chatting list</h1>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}


export default WaitingRoom;