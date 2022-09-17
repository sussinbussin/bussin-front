import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Text, Box, extendTheme, View } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useColorScheme } from "react-native";

import Login from "./views/Login";
import TopBar from "./components/TopBar";

const Stack = createNativeStackNavigator();

const Home = () => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>{colorScheme}</Text>
    </View>
  );
};

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
        bg: "#1e1e1e",
      },
    },
    Text: {
      baseStyle: {
        color: "muted.50",
      },
    },
    View: {
      defaultProps: {
        bg: "#1e1e1e",
      },
    },
    Heading: {
      baseStyle: {
        color: "muted.50",
      },
    },
  },
};
const App = () => {
  const colorScheme = useColorScheme();
  const theme = extendTheme(colorScheme === "dark" ? darkModeTheme : {});
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <TopBar></TopBar>
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
