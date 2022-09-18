import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Text, Box, extendTheme, View } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useColorScheme } from "react-native";

/** Component imports <3 */
import Login from "./views/Login";
import TopBar from "./components/TopBar";
import Home from "./views/Home";

const Stack = createNativeStackNavigator();

const darkModeTheme = {
  colors: {
    primary: {
      50: "dark.50",
      100: "dark.100",
      200: "dark.200",
      300: "dark.300",
      400: "dark.400",
      500: "dark.500",
      600: "dark.600",
      700: "dark.700",
      800: "dark.800",
      900: "dark.900",
    },
  },
  components: {
    Box: {
      baseStyle: {
        bg: "black",
      },
    },
    Text: {
      baseStyle: {
        color: "muted.50",
      },
    },
    View: {
      defaultProps: {
        bg: "black",
      },
    },
    Heading: {
      baseStyle: {
        color: "muted.50",
      },
    },
    Button: {
      variants: {
        outline: {
          _text: "white",
          borderColor: "muted.500",
        },
      },
      baseStyle: {},
    },
  },
};
const App = () => {
  const colorScheme = useColorScheme();
  const theme = extendTheme(colorScheme === "dark" ? darkModeTheme : {});
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar></StatusBar>
    </NativeBaseProvider>
  );
};

export default App;
