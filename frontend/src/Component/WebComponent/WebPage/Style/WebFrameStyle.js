import styled, {createGlobalStyle} from "styled-components";

export const HeadStyle = styled.div`
    width: 75%;
    height: 100%;
    padding:10px;
    margin : 0 auto;
    display: flex;
    //position: absolute;
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
    width: 100vw;
    height: 100vh;
    background : #E0E3DA;
    margin : 0 auto;
    position : absolute;
`;
export const Background = createGlobalStyle`
    body {
      background-color : #E0E3DA;
    }
`
export const BodyCenter = styled.div`
    width: 75%;
    height: 90%;
    margin: 0 auto;
    flex: 1 1 auto;
    
    flex-direction: column;
`;

export const RoomFrame = styled.div`
    height: 90%;
    background-color: #FFFFF3;
    flex: 1 1 auto;
    flex-direction: column;
`;

export const UserList = styled.div`
    display :flex;
    padding: 5px;
    color : ${props => props.color};
    background : ${props => props.background};
    border-bottom: 2px solid gray;
`;

export const Users = styled.span`
    font-size : 16px;
    width : ${props => props.width};
    text-align: ${props => props.align};
    float : left;
`;

export const ButtonArea = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
`;
export const SideAnimation = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
`
// export const ButtonGlobalHover = createGlobalStyle`
//   button {
//     font-size: 14px;
//     color: #ffffff;
//     background-color: #a593e0;
//     border-radius: 2px;
//     border: 0;
//     padding: 10px;
//     text-decoration: none;
//     transition: all 0.5s;
//
//     &:hover {
//       background-color: green;
//     }
//   }
// `;