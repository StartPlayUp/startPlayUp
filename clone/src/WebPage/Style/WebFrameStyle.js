import styled from "styled-components";

export const HeadStyle = styled.div`
    width: 75%;
    height: 100%;
    margin : 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const HeadColor = styled.div`
    background : #566270;
`;

export const HeadLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    color : white;
    font-weight: lighter;
    font-size : ${(props) => props.fontSize};
`;

export const HeadRight = styled.div`
    display: flex;
    justify-content: flex-end;
`
export const BodyFrame = styled.div`
    width: 100%;
    height: 100%;
    background-color : #E0E3DA;
    margin : 0 auto;
    position : absolute;
`;
export const BodyCenter = styled.div`
    width: 75%;
    height: 90%;
    margin: 0 auto;
    flex: 1 1 auto;
    background-color = gray;
    flex-direction: column;
`;

export const RoomFrame = styled.div`
    height: 90%;
    background-color: #FFFFF3;
    flex: 1 1 auto;
    flex-direction: column;
`;

export const UserList = styled.div`
    display :fix;
    padding: 5px;
    color : ${props => props.color};
    background-color : ${props => props.background};
`;

export const Users = styled.span`
    font-size : 14px;
    width : ${props => props.width};
    float : left;
    
`;

export const ButtonArea = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
`;