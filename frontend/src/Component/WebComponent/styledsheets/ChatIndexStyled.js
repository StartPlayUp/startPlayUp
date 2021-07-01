import SideVoiceUser from "./SideVoiceUser";

const TextField = styled.div`
  display:flex;
  padding:10px;
  border: rgb(0, 0, 0);
  flex-direction: column;
  overflow-y: scroll;
  height : 55vh;
  // height:${props => props.width || 500}px;
  width:inherit;
  border-right:3px solid #ececec;
  background-color: white;
  flex-grow:1;
  
  &::-webkit-scrollbar{
    width: 100%;
    background-color: black;
  }
`;

const Chat = styled.div`
    display:flex;
    flex-direction: column;
    justify-content : flex-end;
    flex-basis : 50%;
    // height:${props => props.height || 600}px;
    // width:${props => props.width || 600}px;
    border-radius: 10%;
`;

const TextFieldWithVoiceUsers = styled.div`
      background-color: white;
      width: inherit;
      display: flex;
      flex-direction: row;
`;

const StyledAudio = styled.audio`
    height: 40%;
    width: 50%;
    display:none;
`;