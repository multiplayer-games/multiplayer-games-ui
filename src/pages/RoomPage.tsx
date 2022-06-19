import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { ResponseInRoomUser } from "../models/bluff";
import "./RoomPage.css";

export interface RoomPageProps {
  user: ResponseInRoomUser;
}

export function RoomPage({ user }: RoomPageProps) {
  const context = useContext(AppContext);

  return (
    <div className="room-page__wrapper">
      <div className="room-page__username">Username: {user.username}</div>
      <div className="room-page__room-id">Room Id: {user.roomId}</div>
      <div>
        <div>
          <input
            className="room-page__start-game"
            type="button"
            onClick={context.socketMethods.startGame}
            value="Start Game"
          />
        </div>
        <table className="room-page__table">
          <thead>
            <tr>
              <td>#</td>
              <td>Username</td>
            </tr>
          </thead>
          <tbody>
            {user.users.map((x, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{x.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
