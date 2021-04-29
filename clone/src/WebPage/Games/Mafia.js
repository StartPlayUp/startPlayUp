import Players from "../Players";
import styled from "styled-components";

const Frame = styled.div`
    height : 100%;
    background-color : black;
    color : red;
`
const Mafia = () => {
    let str = " 님이 입장하셨습니다.";

    return(
        <Frame>
            <Players id={"1"} name={'Jang'} log={str}/>
            <Players id={"2"} name={'Chan'} log={str}/>
            <Players id={"3"} name={'JIN'} log={str}/>
        </Frame>
    )
}

export default Mafia;