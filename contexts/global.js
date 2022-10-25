import { createContext } from "react";

const flags = {
  login: true,
  home: true,
  register: true,
  registerName: true,
  profile: true,
  editProfile: true,
  requireLogin: false,
};

/**
 * levels:
 * CHOOSING_DESTINATION
 * CHOOSING_PICKUP
 * CHOOSING_TIME
 *
 */

const initialState = {
  flags: {
    ...flags,
  },
  //what to display on the screen
  stage: {
    level: "CHOOSING_DESTINATION",
    display: "search",
    locationSearch: {
      text: "Where to?",
    },
  },
  dest: {
    item: null,
    geo: null,
  },
  pickup: {
    item: null,
    geo: null,
  },
  selectedRoute: null,
  token: null,
  user: null,
  biometrics: true,
  routes: null,
};
const initState = () => initialState;
const globalReducer = (state, action) => {
  switch (action.type) {
    case "MODIFY_STAGE":
      return {
        ...state,
        stage: { ...action.payload },
      };
    case "SET_DESTINATION":
      return {
        ...state,
        dest: { ...action.payload },
      };
    case "SET_PICKUP":
      return {
        ...state,
        pickup: { ...action.payload },
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "SET_ROUTES":
      return {
        ...state,
        routes: action.payload,
      };
    case "SET_MAP":
      return {
        ...state,
        selectedRoute: action.payload,
      };
    default:
      return state;
  }
};
const GlobalContext = createContext(flags);

export { GlobalContext, globalReducer, initialState, initState };
