import * as PIXI from 'pixi.js';
import { CardName, CardType, CardValue } from '../models/bluff';
import { PSpriteButton } from './PSpriteButton';

const NAME = "cards.png";
const START_X = 0;
const START_Y = 0;
const WIDTH = 55;
const HEIGHT = 81;
const MARGIN_RIGHT = 2.3;
const MARGIN_BOTTOM = 2.66;
const CARD_TYPES: CardType[] = ["Spade", "Club", "Hearth", "Diamond"];
const CARD_VALUES: CardValue[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export interface CardProps {
  container: PIXI.Container;
  name: CardName;
  x?: number;
  y?: number;
  onClick: () => void;
}

export function Card(props: CardProps) {
  const typeIndex = CARD_TYPES.indexOf((props.name as any).split(" ")[0]);
  const valueIndex = CARD_VALUES.indexOf((props.name as any).split(" ")[1]);

  const x = START_X + (WIDTH + MARGIN_RIGHT) * valueIndex;
  const y = START_Y + (HEIGHT + MARGIN_BOTTOM) * typeIndex;
  const frame = new PIXI.Rectangle(x, y, WIDTH, HEIGHT);

  return (
    <PSpriteButton
      container={props.container}
      name={NAME}
      x={props.x}
      y={props.y}
      onClick={props.onClick}
      frame={frame}
    />
  );
}
