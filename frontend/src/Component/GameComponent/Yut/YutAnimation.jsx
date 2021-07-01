import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const Background = styled.div`
	display:flex;
	flex-direction: row;
	background: #28aef9;

`;


const Container = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
	perspective:1000px;
	-webkit-perspective:1000;
	perspective-origin:50%;
	-webkit-perspective-origin:50%;
`;

const rotate = keyframes`
	from{
		transform: none;
	}
	to{
		transform: rotateY(1800deg);
	}
`;

const Dice = styled.div`
	height: 400px;
	width: 100px;
	position: relative;
	bottom: 0;
	margin: 20px;
	transform-style: preserve-3d;
	animation:${rotate} 5s infinite;
	${props => props.stop === true && "animation-play-state: paused;"};
	transform:scale(2, 0.5);
`;


const Face = styled.div`
	background-color:white;
	height:300px;
	width:50px;
	border:7px solid #28aef9;
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
	font-size: 5vh;
	font-weight: bold;
	justify-content: center;
	align-items: center;
`;


const YutAnimation = () => {
	const list = [0, 1, 2, 3];
	const [test, setTest] = useState(true);

	return (
		<Background>
			<button onClick={() => setTest(!test)}></button>
			{list.map((i, index) =>
				<Container>
					<Dice stop={test}>
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
export default YutAnimation;