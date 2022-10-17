import {
  Text,
  Box,
  Button,
  Heading,
  FormControl,
  Input,
  Stack,
  Center,
  View,
} from "native-base";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../contexts/global";
import TopBar from "../components/TopBar";
import { useLoginAPI } from "../api/LoginApi";
import { useUserAPI } from "../api/UsersAPI";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { useToast } from "native-base";
import jwtDecode from "jwt-decode";

const Login = ({ navigation }) => {
  //used for feature toggling
  const { state, dispatch } = useContext(GlobalContext);
  if (!state.flags.login) return null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useLoginAPI(username, password);
  const handlePassword = (value) => setPassword(value);
  const handleUsername = (value) => setUsername(value);
  const toast = useToast();
  //check for biometrics
  useEffect(() => {
    if (!state.biometrics) return;

    (async () => {
      //check if supported
      const compat = await LocalAuthentication.hasHardwareAsync();
      if (!compat) return;
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) return;
      //check if user logged in
      let token = await SecureStore.getItemAsync("idToken");
      token = JSON.parse(token);
      if (!token) return;

      const check = await LocalAuthentication.authenticateAsync();
      if (!check.success) return;

      const decodedToken = jwtDecode(token);
      const { getUser } = useUserAPI(token, decodedToken.email);
      let user = await getUser();
      if (!user) return;
      dispatch({ type: "SET_USER", payload: user });
      dispatch({
        type: "MODIFY_STAGE",
        payload: {
          ...state.stage,
          locationSearch: {
            text: `Where to, ${user.name}?`,
          },
        },
      });
      navigation.navigate("Home");
    })();
  }, []);

  const submit = async () => {
    //for development
    if (username == "" || password == "") {
      if (!state.flags.requireLogin) {
        navigation.navigate("Home");
      }
      return;
    }

    let { token, email } = await loginUser();
    if (!token) {
      //handle invalid user
      setPassword("");
      setUsername("");
      console.log("Invalid user");
      //TODO: create toast
      return;
    }

    const { getUser } = useUserAPI(token.AuthenticationResult.IdToken, email);
    let user = await getUser();
    if (!user) {
      //this one hong gan lo
      return;
    }

    dispatch({ type: "SET_USER", payload: user });
    dispatch({
      type: "MODIFY_STAGE",
      payload: {
        ...state.stage,
        locationSearch: {
          text: `Where to, ${user.name}?`,
        },
      },
    });
    dispatch({
      type: "SET_TOKEN",
      payload: token.AuthenticationResult.IdToken,
    });

    await SecureStore.setItemAsync(
      "idToken",
      JSON.stringify(token.AuthenticationResult.IdToken)
    );
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBar></TopBar>
      <Heading size="xl" style={{ paddingTop: 30 }}>
        Welcome
      </Heading>
      <Box
        w="100%"
        maxWidth="500px"
        style={{
          marginTop: 20,
          padding: 10,
        }}
        variant="light"
      >
        <Stack mx="10">
          <Center style={{ paddingTop: 30 }}>
            <FormControl.Label style={{ alignItems: "center" }}>
              Username
            </FormControl.Label>
            <Input
              value={username}
              type="text"
              placeholder="Username"
              onChangeText={handleUsername}
              variant="underlined"
              size="lg"
            />
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={password}
              type="password"
              placeholder="Password"
              onChangeText={handlePassword}
              variant="underlined"
              size="lg"
            />
            <Button
              onPress={submit}
              w="100%"
              style={{ marginTop: 30 }}
              variant="outline"
            >
              Sign In
            </Button>
          </Center>
        </Stack>
      </Box>

      <View>
        <Center>
          <Text style={{ marginTop: 9 }} fontSize="15">
            No account yet?
          </Text>
          <Text
            onPress={() => {
              navigation.navigate("Register");
            }}
            textAlign="center"
            paddingTop="7.5"
            w="100%"
            fontSize="16"
            fontWeight="bold"
          >
            Sign up here!
          </Text>
        </Center>
      </View>
    </View>
  );
};

export default Login;