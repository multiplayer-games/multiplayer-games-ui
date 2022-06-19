import * as PIXI from "pixi.js";
import { Player as IPlayer } from "../models/bluff";
import { PContainer } from "./PContainer";
import { PLine } from "./PLine";
import { PRectangle } from "./PRectangle";
import { PText } from "./PText";

export interface PlayerProps {
  container: PIXI.Container;
  playerInfo: IPlayer;
  x?: number;
  y?: number;
}

const WIDTH = 175;
const HEIGHT = 60;
const LINE_WIDTH = 2;

export function Player(props: PlayerProps) {
  const isYou = props.playerInfo.isYou ? " (You)" : "";
  const lastMove =
    props.playerInfo.lastMove === "NONE"
      ? ""
      : props.playerInfo.lastMove.toString();

  const color = props.playerInfo.isTurn ? "#4f772d" : "#333333";
  const lineColor = props.playerInfo.isTurn ? 0x4f772d : 0x333333;

  const textStyle: Partial<PIXI.ITextStyle> = {
    fill: color,
    fontSize: 14,
    dropShadow: props.playerInfo.isTurn,
    dropShadowDistance: 0,
    dropShadowBlur: 8,
    dropShadowColor: color,
  };

  return (
    <PContainer container={props.container} x={props.x} y={props.y}>
      <PText
        container={props.container}
        value={`Player${isYou}: ${props.playerInfo.name}`}
        style={textStyle}
        x={4}
        y={2}
      />
      <PText
        container={props.container}
        value={"Total Cards: " + props.playerInfo.cards.length}
        style={textStyle}
        x={4}
        y={22}
      />
      <PText
        container={props.container}
        value={"Last Move: " + lastMove}
        style={textStyle}
        x={4}
        y={42}
      />
      <PRectangle
        container={props.container}
        width={WIDTH}
        height={HEIGHT}
        lineWidth={LINE_WIDTH}
        color={lineColor}
      />
      <PLine
        container={props.container}
        y1={20}
        x2={WIDTH}
        y2={20}
        width={LINE_WIDTH}
        color={lineColor}
      />
      <PLine
        container={props.container}
        y1={40}
        x2={WIDTH}
        y2={40}
        width={LINE_WIDTH}
        color={lineColor}
      />
    </PContainer>
  );
}
