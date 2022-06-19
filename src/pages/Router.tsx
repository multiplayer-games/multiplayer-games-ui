import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { GamePage } from "./GamePage";
import { LoggedInPage } from "./LoggedInPage";
import { LoginPage } from "./LoginPage";
import { RoomPage } from "./RoomPage";

export function Router() {
  const context = useContext(AppContext);

  if (!context.user || context.user.status === "NonAuth") {
    return <LoginPage />;
  }

  if (context.user.status === "LoggedIn") {
    return <LoggedInPage user={context.user} />;
  }

  if (context.user.status === "InRoom") {
    return <RoomPage user={context.user} />;
  }

  if (context.user.status === "InGame") {
    return <GamePage roomId={context.user.game.id} game={context.user.game} />;
  }

  return <div>Router error!</div>;
}
