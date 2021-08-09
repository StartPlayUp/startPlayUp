import React from "react";
import * as S from "../Styled";
const PlayerRoles = (props) => {
  console.log(`props : ${props.nicka}`);
  console.log(`props.role : ${props.role}`);
  return (
    <React.Fragment>
      {props.role === "Morgana" && (
        <S.FrontImg src={"/img/Morgana.png"} alt={"Morgana"} />
      )}
      {props.role === "Assassin" && (
        <S.FrontImg src={"/img/Assassin.png"} alt={"Assassin"} />
      )}
      {props.role === "Percival" && (
        <S.FrontImg src={"/img/Percival.png"} alt={"Percival"} />
      )}
      {props.role === "Merlin" && (
        <S.FrontImg src={"/img/Merlin.png"} alt={"Merlin"} />
      )}
      {props.role === "Citizen" && (
        <S.FrontImg src={"/img/Citizen.png"} alt={"Citizen"} />
      )}
      {props.role === "Modred" && (
        <S.FrontImg src={"/img/Modred.png"} alt={"Modred"} />
      )}
      {props.role === "Heresy" && (
        <S.FrontImg src={"/img/Heresy.png"} alt={"Heresy"} />
      )}
    </React.Fragment>
  );
};
export default PlayerRoles;
