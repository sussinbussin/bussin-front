import { flags, FlagContext } from "./contexts/flags";
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

const Stack = createNativeStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();
  const theme = extendTheme(colorScheme === "dark" ? darkModeTheme : {});
  return (
    <FlagContext.Provider value={flags}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="RegisterName" component={RegisterName} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar></StatusBar>
      </NativeBaseProvider>
    </FlagContext.Provider>
  );
};
export default App;
