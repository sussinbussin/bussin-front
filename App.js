import {
  GlobalContext,
  globalReducer,
  initialState,
  initState,
} from "./contexts/global";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
/**Theming */
import { useColorScheme } from "react-native";
import darkModeTheme from "./theming/dark";
/** Component imports <3 */
import Login from "./views/Login";
import Home from "./views/Home";
import Profile from "./views/Profile";
import EditProfile from "./views/EditProfile";
import Scheduled from "./views/Scheduled";
import RegisterNew from "./views/RegisterNew";
import BookingSuccess from "./views/BookingSuccess";
import { useReducer } from "react";

const Stack = createNativeStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(globalReducer, initialState, initState);
  const colorScheme = useColorScheme();
  const theme = extendTheme(colorScheme === "dark" ? darkModeTheme : {});

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="RegisterNew" component={RegisterNew} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Scheduled" component={Scheduled} />
            <Stack.Screen name = "BookingSuccess" component={BookingSuccess} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar></StatusBar>
      </NativeBaseProvider>
    </GlobalContext.Provider>
  );
};
export default App;
