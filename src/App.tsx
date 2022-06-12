import React, { useMemo, useState } from "react";
import "./App.css";
import { useApp } from "./useApp";
import { Card, CardName, CardType, CardValue } from "./components/Card";
import { PContainer } from "./components/PContainer";
import { Player } from "./components/Player";
import { PText } from "./components/PText";
import { io } from "socket.io-client";
import { Player as IPlayer } from "./models/bluff";
import { PImageButton } from "./components/PImageButton";

interface SelectedCard {
  type: CardType;
  value: CardValue;
  name: CardName;
}

const clubCardNames: CardName[] = [
  "Club A",
  "Club 2",
  "Club 3",
  "Club 4",
  "Club 5",
  "Club 6",
  "Club 7",
  "Club 8",
  "Club 9",
  "Club 10",
  "Club J",
  "Club Q",
  "Club K",
];

function App() {
  const app = useApp();
  const [name, setName] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [selectedCardValueIndex, setSelectedCardValueIndex] =
    useState<number>(0);
  const [gameData, setGameData] = useState<any>();
  const [pickCards, setPickCards] = useState<SelectedCard[]>([]);

  const socket = useMemo(() => {
    const client = io("ws://localhost:3001");
    // client.on('connect', () => alert('connected'));
    client.on("notify", (game) => {
      console.log(game);
      setGameData(game);
      setSelectedCardValueIndex(
        clubCardNames.findIndex((x) => x.includes(game.cardValue))
      );
    });

    return client;
  }, []);

  return (
    <div className="App">
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Username"
      />
      <button onClick={() => socket.emit("login", { name })}>Login</button>
      <button onClick={() => socket.emit("create-room")}>Create Room</button>
      <input
        onChange={(e) => setRoomName(e.target.value)}
        value={roomName}
        placeholder="Room ID"
      />
      <button onClick={() => socket.emit("join-room", { roomId: roomName })}>
        Join Room
      </button>
      <button onClick={() => socket.emit("start")}>Start Game</button>
      <div>Room Id: {gameData?.roomId}</div>
      {app && gameData && (
        <>
          {gameData.players.map((player: IPlayer, i: number) => (
            <Player
              key={i}
              container={app.stage}
              playerInfo={player}
              x={10 + 200 * i}
              y={10}
            />
          ))}

          <PContainer container={app.stage} x={10} y={300}>
            <PText
              container={app.stage}
              value={
                "Selected Card: " +
                clubCardNames[selectedCardValueIndex].split(" ")[1]
              }
              y={-25}
              style={{ fontSize: 16 }}
            />
            {clubCardNames.map((cardName, i) => (
              <Card
                key={i}
                container={app.stage}
                name={cardName}
                x={i * 40}
                y={i === selectedCardValueIndex ? 0 : 10}
                onClick={() => setSelectedCardValueIndex(i)}
              />
            ))}
          </PContainer>

          <PText
            container={app.stage}
            value={"Cards Count On The Ground: " + gameData.cards.length}
            x={10}
            y={200}
            style={{ fontSize: 16 }}
          />

          <PContainer container={app.stage} x={10} y={500}>
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
            {gameData.players
              .find((x: any) => x.isYou)
              .cards.sort((x: any, y: any) => {
                const f = clubCardNames.map((x) => x.substring("CLUB ".length));
                const i1 = f.indexOf(x.value);
                const i2 = f.indexOf(y.value);
                return i1 - i2;
              })
              .map((item: SelectedCard, i: number) => (
                <Card
                  key={i}
                  container={app.stage}
                  name={item.name}
                  x={i * 40}
                  y={pickCards.some((x) => x.name === item.name) ? 0 : 10}
                  onClick={() => {
                    const isSelected = pickCards.some(
                      (x) => x.name === item.name
                    );

                    if (isSelected) {
                      setPickCards(
                        pickCards.filter((x) => x.name !== item.name)
                      );
                    } else {
                      setPickCards([...pickCards, item]);
                    }
                  }}
                />
              ))}
          </PContainer>

          <PContainer container={app.stage} x={10} y={430}>
            <PImageButton
              container={app.stage}
              imageUrl="button_bluff"
              x={0}
              onClick={() => {
                const data = {
                  roomId: gameData.roomId,
                  type: "BLUFF",
                };

                socket.emit("play", data);
              }}
            />
            <PImageButton
              container={app.stage}
              imageUrl="button_pass"
              x={90}
              onClick={() => {
                const data = {
                  roomId: gameData.roomId,
                  type: "PASS",
                };

                socket.emit("play", data);
              }}
            />
            <PImageButton
              container={app.stage}
              imageUrl="button_play"
              x={175}
              onClick={() => {
                const data = {
                  roomId: gameData.roomId,
                  type: "CARDS",
                  cardValue:
                    clubCardNames[selectedCardValueIndex].split(" ")[1],
                  selectedCards: pickCards,
                };

                socket.emit("play", data);

                setPickCards([]);
              }}
            />
          </PContainer>
        </>
      )}
    </div>
  );
}

export default App;
