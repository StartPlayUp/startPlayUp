import Users from "./Users";
import styled from "styled-components";

const Frame = styled.div`
    height : 100%;
    background-color : orange;
    color : black;
`

const YachtDice = () => {
    let str = "님이 입장하셨습니다."

    return(
        <Frame>
            <Users id={"1"} name={'Jang'} log={str}/>
            <Users id={"2"} name={'Chan'} log={str}/>
            <Users id={"3"} name={'JIN'} log={str}/>
        </Frame>
    )
}

export default YachtDice;