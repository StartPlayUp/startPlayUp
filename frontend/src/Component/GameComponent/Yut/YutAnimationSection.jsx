import React, { useContext, useState, useEffect, useReducer, memo } from "react";
import styled, { keyframes } from "styled-components";
import { YutViewContext } from 'Container/GameContainer/Yut/YutStore';

const Background = styled.div`
	display:flex;
	flex-direction: row;
	background: #A6634D;
	border-radius: 30px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    flex-grow: 0.5;
    justify-content: center;
	align-items: center;
	height:570px;
`;


const Container = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;

	/* 원근법 perspective */
	perspective:200px;
	-webkit-perspective:200;
	perspective-origin:50%;
	-webkit-perspective-origin:50%;

	height:inherit;
`;

const rotate = (y) => keyframes`
	from{
		transform: none;
	}
	to{
		transform:rotateY(${y});
	}
`;

const Dice = styled.div`
	height: inherit;
	width: 100px;
	position: relative;
	bottom: 0;
	transform-style: preserve-3d;
	animation:${props => props.yutView === 0 ? rotate('1800deg') : (props.yutView === 1 ? rotate('1980deg') : rotate('0deg'))} 1s ;
	animation-fill-mode: forwards;
	/* animation-fill-mode: backwards; */
	/* ${props => props.stop === true && "animation-play-state: paused;"}; */
	transform:scale(2, 0.5);
`;

const Face = styled.div`
	background-color:white;
	height:300px;
	width:50px;
	border-radius: 20px;
	border-left:3px solid white;
	border-right:3px solid white;
	box-shadow: 3px;

	box-sizing:border-box;
	position: absolute;
	margin: auto;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	display: flex;
	flex-direction:column;
	justify-content:space-around;
	align-items:center;

	background:#ffb14f;
`;

const Front = styled(Face)`
	transform: translateZ(25px);
`;

const Back = styled(Face)`
	transform: translateZ(-25px) rotateY(180deg);
`;
const Left = styled(Face)`
		transform: rotateY(270deg) translateX(-25px);
	transform-origin: center left;
`;
const Right = styled(Face)`
	transform: rotateY(-270deg) translateX(25px);
	transform-origin: top right;
`;

const FaceText = styled.div`
	height: 35px;
	width: 30px;
	border-radius: 30%;
	display:flex;
	font-size: 4vh;
	font-weight: bold;
	justify-content: center;
	align-items: center;
	color:#905338;
`;

const YutAnimationSection = () => {
	const { yutView } = useContext(YutViewContext);
	const [forceUpdate, setForceUpdate] = useState(0);

	useEffect(() => {
		setForceUpdate(forceUpdate + 1);
	}, [yutView])

	return (
		<Background>
			{yutView.map((i, index) =>
				<Container key={index}>
					<Dice key={forceUpdate} yutView={i}>
						<Front>
							<FaceText>X</FaceText>
							<FaceText>X</FaceText>
							<FaceText>X</FaceText>
						</Front>
						<Left />
						<Right />
						<Back>
							{index === 0 && <FaceText>백 도</FaceText>}
						</Back>
					</Dice>
				</Container>)
			}
		</Background >
	)
}
export default memo(YutAnimationSection);