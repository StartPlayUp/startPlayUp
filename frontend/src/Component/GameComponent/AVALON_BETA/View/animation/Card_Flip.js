import React, {useState} from "react";
import {animated, useSpring, useTransition, config} from "react-spring";

import * as S from "../../Styled";
import {FrontImg} from "../../Styled";

const AnimatedPokerFront = animated(S.PokerFront);
const AnimatedPokerBack = animated(S.PokerBack);

export default function Card_Flip(props) {
    const [isFlipped, setIsFlipped] = useState(false);
    console.log(props.role);
    const {opacity, transform} = useSpring({
        opacity: isFlipped ? 1 : 0,
        transform: `rotateY(${isFlipped ? 0 : 180}deg)`,
        config: config.stiff,
    });
    // const CardList = [{dealay: 200}];
    // const [cards, setCards] = useState([]);
    //
    // // METHOD 1. MOST SIMLE WAY TO ACHIEVE DELAY
    // const transition = useTransition(cards, {
    //     from: {
    //         opacity: 0,
    //         x: 150,
    //         y: 100,
    //     },
    //     enter: {opacity: 1, x: 10, y: 10},
    //     leave: {opacity: 0, x: 500, y: 500},
    //     trail: 150,
    // });
    const flip = () => setIsFlipped((prevState) => !prevState);

    return (
        <React.Fragment>
            {/*<div>*/}
            {/*    <button onClick={() => setCards(cards.length > 0 ? [] : CardList)}>*/}
            {/*        {cards.length > 0 ? "unmount" : "mount"}*/}
            {/*    </button>*/}
            {/*    {transition(*/}
            {/*        (style, item) =>*/}
            {/*            props.role === 'Morgana' && item && (*/}
            {/*                <animated.div*/}
            {/*                    style={{*/}
            {/*                        ...style,*/}
            {/*                        border: "1px solid green",*/}
            {/*                        padding: "10px",*/}
            {/*                        width: "50px",*/}
            {/*                        borderRadius: "5px"*/}
            {/*                    }}*/}
            {/*                >*/}
            {/*                    card*/}
            {/*                </animated.div>*/}
            {/*            )*/}
            {/*    )}*/}
            {/*</div>*/}
            <S.CardWrapper onClick={flip}>
                <S.NicknameTag>{props.nickname}</S.NicknameTag>
                <AnimatedPokerBack
                    style={{
                        opacity: opacity.interpolate((o) => 1 - o),

                        transform: transform.interpolate(
                            (t) => `perspective(400px)  ${t} rotateY(180deg)`
                        ),
                    }}
                />
                <AnimatedPokerFront style={{opacity, transform}}>
                    {props.role === "Morgana" && (
                        <FrontImg src={"/img/Morgana.png"} alt={"Morgana"}/>
                    )}
                    {props.role === "Assassin" && (
                        <FrontImg src={"/img/Assassin.png"} alt={"Assassin"}/>
                    )}
                    {props.role === "Percival" && (
                        <FrontImg src={"/img/Percival.png"} alt={"Percival"}/>
                    )}
                    {props.role === "Merlin" && (
                        <FrontImg src={"/img/Merlin.png"} alt={"Merlin"}/>
                    )}
                    {props.role === "Citizen" && (
                        <FrontImg src={"/img/Citizen.png"} alt={"Citizen"}/>
                    )}
                    {props.role === "Modred" && (
                        <FrontImg src={"/img/Modred.png"} alt={"Modred"}/>
                    )}
                    {props.role === "Heresy" && (
                        <FrontImg src={"/img/Heresy.png"} alt={"Heresy"}/>
                    )}
                </AnimatedPokerFront>
            </S.CardWrapper>
        </React.Fragment>
    );
}
