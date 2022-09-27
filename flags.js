import { createContext } from "react";
/**
 * Flags for feature flagging
 */
export const flags = {
  login: true,
  home: true,
  register: true,
  registerName: true,
};
export const FlagContext = createContext(flags);
