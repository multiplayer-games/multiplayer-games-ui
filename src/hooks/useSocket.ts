import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Card, CardValue } from "../models/bluff";
import { HOST } from "../constants";
import { User } from "../models/bluff";

export interface SocketOptions {
  onConnected: () => void;
  onNotify: (user: User) => void;
}

export interface SocketMethods {
  login: (username: string) => void;
  createRoom: () => void;
  joinRoom: (roomId: string) => void;
  startGame: () => void;
  playBluff: (roomId: string) => void;
  playPass: (roomId: string) => void;
  playCards: (
    roomId: string,
    cardValue: CardValue,
    selectedCards: Card[]
  ) => void;
}

export function useSocket(options: SocketOptions) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const client = io(HOST);
    client.on("connect", options.onConnected);
    client.on("notify", options.onNotify);

    setSocket(client);

    return () => {
      socket?.off();
      socket?.disconnect();
    };
  }, []);

  const methods: SocketMethods = {
    login: (username: string) => socket?.emit("login", { name: username }),
    createRoom: () => socket?.emit("create-room"),
    joinRoom: (roomId: string) => socket?.emit("join-room", { roomId }),
    startGame: () => socket?.emit("start"),
    playBluff: (roomId: string) =>
      socket?.emit("play", { type: "BLUFF", roomId }),
    playPass: (roomId: string) =>
      socket?.emit("play", { type: "PASS", roomId }),
    playCards: (
      roomId: string,
      cardValue: CardValue,
      selectedCards: Card[]
    ) => {
      socket?.emit("play", { type: "CARDS", roomId, cardValue, selectedCards });
    },
  };

  return methods;
}
