import {
  GlobalContext,
  globalReducer,
  initialState,
  initState,
} from "./contexts/global";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Text, Box, extendTheme, View } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
/**Theming */
import { useColorScheme } from "react-native";
import darkModeTheme from "./theming/dark";
/** Component imports <3 */
import Login from "./views/Login";
import TopBar from "./components/TopBar";
import Home from "./views/Home";
import Register from "./views/Register";
import RegisterName from "./views/RegisterName";
import Profile from "./views/Profile";
import EditProfile from "./views/EditProfile";
import Scheduled from "./views/Scheduled";
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
              gestureEnabled:false
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="RegisterName" component={RegisterName} />
            <Stack.Screen name = "Profile" component={Profile} />
            <Stack.Screen name = "EditProfile" component={EditProfile} />
            <Stack.Screen name = "Scheduled" component={Scheduled} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar></StatusBar>
      </NativeBaseProvider>
    </GlobalContext.Provider>
  );
};
export default App;
