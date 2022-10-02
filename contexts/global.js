import { createContext } from "react";

const flags = {
  login: true,
  home: true,
  register: true,
  registerName: true,
  profile: true,
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
  camera: {
    lat: 0,
    lng: 0,
  },
  destination: {
    item: null,
    geo: null,
  },
  pickup: {
    item: null,
    geo: null,
  },
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
        destination: { ...action.payload },
      };
    case "SET_PICKUP":
      return {
        ...state,
        pickup: { ...action.payload },
      };
    case "ADJUST_CAMERA":
      return {
        ...state,
        camera: action.payload,
      };
    default:
      return state;
  }
};
const GlobalContext = createContext(flags);

export { GlobalContext, globalReducer, initialState, initState };
