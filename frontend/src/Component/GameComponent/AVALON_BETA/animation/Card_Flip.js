import React, {useState} from "react";
import {animated, useSpring, config} from "react-spring";
import * as S from "../Styled";

const AnimatedPokerFront = animated(S.PokerFront);
const AnimatedPokerBack = animated(S.PokerBack);

export default function CardFlip(props) {
    const [isFlipped, setIsFlipped] = useState(false);
    console.log(props.role);
    const {opacity, transform} = useSpring({
        opacity: isFlipped ? 1 : 0,
        transform: `rotateY(${isFlipped ? 0 : 180}deg)`,
    });
    const flip = () => setIsFlipped((prevState) => !prevState);

    return (
        <React.Fragment>
            <S.CardWrapper onClick={flip}>
                <S.NicknameTag>{props.nickname}</S.NicknameTag>
                <AnimatedPokerBack
                    style={{
                        opacity: opacity.interpolate((o) => 1 - o),
                        transform: transform.interpolate(
                            (t) => `perspective(500px)  ${t} rotateY(180deg)`
                        ),
                    }}
                />
                <AnimatedPokerFront style={{opacity, transform}}>
                    {props.role === "Morgana" && (
                        <S.FrontImg src={"/img/Morgana.png"} alt={"Morgana"}/>
                    )}
                    {props.role === "Assassin" && (
                        <S.FrontImg src={"/img/Assassin.png"} alt={"Assassin"}/>
                    )}
                    {props.role === "Percival" && (
                        <S.FrontImg src={"/img/Percival.png"} alt={"Percival"}/>
                    )}
                    {props.role === "Merlin" && (
                        <S.FrontImg src={"/img/Merlin.png"} alt={"Merlin"}/>
                    )}
                    {props.role === "Citizen" && (
                        <S.FrontImg src={"/img/Citizen.png"} alt={"Citizen"}/>
                    )}
                    {props.role === "Modred" && (
                        <S.FrontImg src={"/img/Modred.png"} alt={"Modred"}/>
                    )}
                    {props.role === "Heresy" && (
                        <S.FrontImg src={"/img/Heresy.png"} alt={"Heresy"}/>
                    )}
                </AnimatedPokerFront>
            </S.CardWrapper>
        </React.Fragment>
    );
}
