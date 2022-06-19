import { useState } from "react";
import { AppContext } from "./contexts/AppContext";
import { useSocket } from "./hooks/useSocket";
import { User } from "./models/bluff";
import { Router } from "./pages/Router";

function App() {
  const [user, setUser] = useState<User>();

  const socketMethods = useSocket({
    onConnected: () => console.log("Socket connected!"),
    onNotify: (user) => {
      setUser(user);
    },
  });

  return (
    <AppContext.Provider
      value={{
        user: user!,
        socketMethods: socketMethods,
      }}
    >
      <Router />
    </AppContext.Provider>
  );
}

export default App;
