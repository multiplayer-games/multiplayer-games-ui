import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { ResponseLoggedInUser } from "../models/bluff";
import "./LoggedInPage.css";

export interface RoomPageProps {
  user: ResponseLoggedInUser;
}

export function LoggedInPage({ user }: RoomPageProps) {
  const [roomId, setRoomId] = useState("");
  const context = useContext(AppContext);

  return (
    <div className="logged-in-page__wrapper">
      <div className="logged-in-page__username">Username: {user.username}</div>
      <input
        className="logged-in-page__create-room"
        type="button"
        onClick={context.socketMethods.createRoom}
        value="Create Room"
      />
      <div>
        <input
          className="logged-in-page__room-id"
          type="text"
          placeholder="Room Id"
          onChange={(e) => setRoomId(e.target.value)}
          value={roomId}
        />
        <input
          className="logged-in-page__join-room"
          type="button"
          onClick={() => context.socketMethods.joinRoom(roomId)}
          value="Join Room"
        />
      </div>
    </div>
  );
}
