import { createContext } from "react";
/**
 * Flags for feature flagging
 */
export const flags = {
  login: true,
  home: false,
};
export const FlagContext = createContext(flags);
