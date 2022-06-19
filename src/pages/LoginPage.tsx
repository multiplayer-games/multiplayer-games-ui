import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import "./LoginPage.css";

export function LoginPage() {
  const context = useContext(AppContext);
  const [username, setUsername] = useState("");

  return (
    <div className="login-page__wrapper">
      <div>
        <input
          className="login-page__username"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          className="login-page__login"
          type="button"
          onClick={() => context.socketMethods.login(username)}
          value="Login"
        />
      </div>
    </div>
  );
}
