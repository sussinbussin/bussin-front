import { createContext } from "react";

const flags = {
  login: true,
  home: true,
  register: true,
  registerName: true,
  profile: true,
};

const initialState = {
  flags: {
    ...flags,
  },
  currentState: "CHOOSING_DESTINATION",
  destination: "",
  pickup: "",
};
const initState = () => initialState;
const globalReducer = (state, action) => {
  switch (action.type) {
    case "DESTINATION_STAGE":
      return {
        ...state,
        currentState: "CHOOSING_DESTINATION",
      };
    /**
     * Set stage to pickup and also save the desintation chosen
     */
    case "PICKUP_STAGE":
      return {
        ...state,
        currentState: "CHOOSING_PICKUP",
        destination: action.payload,
      };
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
