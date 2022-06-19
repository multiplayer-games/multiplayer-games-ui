import { createContext } from "react";
import { SocketMethods } from "../hooks/useSocket";
import { User } from "../models/bluff";

export interface AppContextData {
  user: User;
  socketMethods: SocketMethods;
}

const defaultValues: AppContextData = {
  user: null!,
  socketMethods: null!,
};

export const AppContext = createContext<AppContextData>(defaultValues);
