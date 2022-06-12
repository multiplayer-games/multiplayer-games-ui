import * as PIXI from "pixi.js";
import { Player as IPlayer } from "../models/bluff";
import { PContainer } from "./PContainer";
import { PText } from "./PText";

export interface PlayerProps {
  container: PIXI.Container;
  playerInfo: IPlayer;
  x?: number;
  y?: number;
}

export function Player(props: PlayerProps) {
  const isYou = props.playerInfo.isYou ? " (You)" : "";
  const isTurn = props.playerInfo.isTurn ? " (Turn)" : "";
  const lastMove =
    props.playerInfo.lastMove === "NONE"
      ? ""
      : props.playerInfo.lastMove.toString();

  return (
    <PContainer container={props.container} x={props.x} y={props.y}>
      <PText
        container={props.container}
        value={props.playerInfo.name + isYou + isTurn}
        style={{ fill: "red", fontSize: 14 }}
      />
      <PText
        container={props.container}
        value={"Cards: " + props.playerInfo.cardCount}
        style={{ fill: "black", fontSize: 16 }}
        y={16}
      />
      <PText
        container={props.container}
        value={"Last Move: " + lastMove}
        style={{ fill: "black", fontSize: 16 }}
        y={32}
      />
    </PContainer>
  );
}
