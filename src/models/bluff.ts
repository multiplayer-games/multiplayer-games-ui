export interface Game {
  id: string;
  players: Player[];
  isStarted: boolean;
  cardValue: string;
  cardValueSelectable: boolean;
}

export interface Player {
  name: string;
  isTurn: boolean;
  isYou: boolean;
  cardCount: number;
  lastMove: "NONE" | "PASS" | "BLUFF" | number;
}

export interface Card {
  name: string;
  type: string;
  value: string;
}
