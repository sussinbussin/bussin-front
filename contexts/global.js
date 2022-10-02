import { createContext } from "react";

const flags = {
  login: true,
  home: true,
  register: true,
  registerName: true,
};

const initialState = {
  flags: {
    ...flags,
  },
  currentState: "CHOOSING_DESTINATION",
};
const initState = () => initialState;
const globalReducer = (state, action) => {
  switch (action.type) {
    case "DESTINATION":
      return { ...state, currentState: "CHOOSING_DESTINATION" };
    case "PICKUP":
      return { ...state, currentState: "CHOOSING_PICKUP" };
    default:
      return state;
  }
};
const GlobalContext = createContext(flags);

export { GlobalContext, globalReducer, initialState, initState };

/**
 *
 *
 *
 */
