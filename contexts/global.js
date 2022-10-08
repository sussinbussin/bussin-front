import { createContext } from "react";

const flags = {
  login: true,
  home: true,
  register: true,
  registerName: true,
  profile: true,
  editProfile: true,
  requireLogin: false,
  bookingConfirmation: true,
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
  dest: {
    item: null,
    geo: null,
  },
  pickup: {
    item: null,
    geo: null,
  },
  token: null,
  user: null,
  biometrics: true,
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
    case "ADJUST_CAMERA":
      return {
        ...state,
        camera: action.payload,
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
    default:
      return state;
  }
};
const GlobalContext = createContext(flags);

export { GlobalContext, globalReducer, initialState, initState };
