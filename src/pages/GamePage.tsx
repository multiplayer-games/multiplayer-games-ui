import { useContext, useEffect, useRef, useState } from "react";
import { PContainer } from "../components/PContainer";
import { Player } from "../components/Player";
import { PText } from "../components/PText";
import {
  Card as ICard,
  CardValue,
  Game,
  Player as IPlayer,
} from "../models/bluff";
import { PImageButton } from "../components/PImageButton";
import { Card } from "../components/Card";
import { useApp } from "../hooks/useApp";
import { ClubCardNames } from "../constants";
import { AppContext } from "../contexts/AppContext";
import "./GamePage.css";

export interface GamePageProps {
  roomId: string;
  game: Game;
}

export function GamePage({ roomId, game }: GamePageProps) {
  const context = useContext(AppContext);
  const divRef = useRef(null);
  const app = useApp(divRef);

  const [selectedCardValueIndex, setSelectedCardValueIndex] =
    useState<number>(0);
  const [pickCards, setPickCards] = useState<ICard[]>([]);

  useEffect(() => {
    setSelectedCardValueIndex(
      ClubCardNames.findIndex((x) => x.includes(game.cardValue))
    );
  }, [game.cardValue]);

  const isMyTurn = game.players.some((x) => x.isYou && x.isTurn);
  const cards = game.players
    .find((x) => x.isYou)!
    .cards.sort((x: any, y: any) => {
      const f = ClubCardNames.map((x) => x.substring("CLUB ".length));
      const i1 = f.indexOf(x.value);
      const i2 = f.indexOf(y.value);
      return i1 - i2;
    });

  return (
    <div ref={divRef} className="game-page__wrapper">
      {app && (
        <>
          {game.players.map((player: IPlayer, i: number) => (
            <Player
              key={i}
              container={app.stage}
              playerInfo={player}
              x={10 + 200 * i}
              y={10}
            />
          ))}

          <PText
            container={app.stage}
            value={"Cards Count On The Ground: " + game.cards.length}
            x={295}
            y={240}
            style={{ fontSize: 16 }}
          />

          <PContainer
            container={app.stage}
            x={10}
            y={cards.length > 25 ? 200 : 300}
          >
            <PText
              container={app.stage}
              value={
                "Selected Card: " +
                ClubCardNames[selectedCardValueIndex].split(" ")[1]
              }
              x={335}
              y={-25}
              style={{ fontSize: 16 }}
            />
            {(true || !game.canSetCardValue || !isMyTurn) && (
              <Card
                container={app.stage}
                name={ClubCardNames[selectedCardValueIndex]}
                x={400 - 55 / 2}
                y={10}
                onClick={() => { }}
              />
            )}
            {game.canSetCardValue &&
              isMyTurn &&
              ClubCardNames.map((cardName, i) => (
                <Card
                  key={i}
                  container={app.stage}
                  name={cardName}
                  x={132.5 + i * 40}
                  y={i === selectedCardValueIndex ? 0 : 10}
                  onClick={() => {
                    setSelectedCardValueIndex(i);
                  }}
                />
              ))}
          </PContainer>

          <PContainer
            container={app.stage}
            x={10}
            y={cards.length > 25 ? 400 : 500}
          >
            <PText
              container={app.stage}
              value={`Selected Card Count: ${pickCards.length}`}
              y={-20}
              style={{
                fontSize: 16,
                fill: "#023047",
                fontWeight: "bold",
                dropShadow: true,
                dropShadowBlur: 4,
                dropShadowColor: "#8ecae6",
                dropShadowDistance: 1,
              }}
            />
            {cards.map((item, i) => (
              <Card
                key={i}
                container={app.stage}
                name={item.name}
                x={(i % 25) * 30}
                y={
                  pickCards.some((x) => x.name === item.name)
                    ? Math.floor(i / 25) * 100
                    : Math.floor(i / 25) * 100 + 10
                }
                onClick={() => {
                  const isSelected = pickCards.some(
                    (x) => x.name === item.name
                  );

                  if (isSelected) {
                    setPickCards(pickCards.filter((x) => x.name !== item.name));
                  } else {
                    setPickCards([...pickCards, item]);
                  }
                }}
              />
            ))}
          </PContainer>

          {isMyTurn && (
            <PContainer
              container={app.stage}
              x={10}
              y={cards.length > 25 ? 330 : 430}
            >
              {game.canPlayBluff && (
                <PImageButton
                  container={app.stage}
                  imageUrl="button_bluff"
                  x={0}
                  onClick={() => {
                    context.socketMethods.playBluff(roomId);
                  }}
                />
              )}
              {game.canPlayPass && (
                <PImageButton
                  container={app.stage}
                  imageUrl="button_pass"
                  x={90}
                  onClick={() => {
                    context.socketMethods.playPass(roomId);
                  }}
                />
              )}
              <PImageButton
                container={app.stage}
                imageUrl="button_play"
                x={175}
                onClick={() => {
                  const cardValue = ClubCardNames[selectedCardValueIndex].split(
                    " "
                  )[1] as CardValue;

                  context.socketMethods.playCards(roomId, cardValue, pickCards);

                  setPickCards([]);
                }}
              />
            </PContainer>
          )}
        </>
      )}
    </div>
  );
}
