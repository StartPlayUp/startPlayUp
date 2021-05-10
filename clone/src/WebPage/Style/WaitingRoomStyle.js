import styled from "styled-components";

export const BodyFrame = styled.div`
    width: 100%;
    height: 100vh;
    position : absolute;
    background-color : #E0E3DA;
`;

export const Room = styled.div`
    width: 75%;
    height :90vh;
    margin : auto;
    margin-top : 50px;    
`

export const Title = styled.div`
    display: flex;
    align-items: center;
`

export const TitleSpan = styled.span`
    margin-right : 30px;
    font-size : ${(props) => props.fontSize};
    color : ${(props) => props.color};
`
export const ButtonArea = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const LeftButtonsArea = styled.div`
    
`

export const RightButtonsArea = styled.div`
   
`

export const Button = styled.button`
    font-size: 14px;
    color: #FFFFFF;
    background-color: #A593E0;
    border-radius: 2px;
    border: 0;
    padding: 5px 15px 5px 15px;
    text-decoration : none;
    margin-right : 30px;
    margin-right : ${props => props.margin};
`;

export const MainList = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-top: 30px;
`

export const UserList = styled.div`
    flex-basis: 50%;
    flex-direction: column;
    border : 2px solid gray;
    padding-left : 2px;

`

export const ChattingList = styled.div`
    flex-basis: 50%;
    flex-direction: column;
    height: 500px;
    background-color: #FFFFF3;
`
