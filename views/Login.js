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
import { useContext } from "react";
import { FlagContext } from "../flags";
import TopBar from "../components/TopBar";

const Login = ({ navigation }) => {
  const flag = useContext(FlagContext);
  if (!flag.login) return null;
  const submit = () => {
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
          <Center>
            <FormControl.Label style={{ alignItems: "center" }}>
              Username
            </FormControl.Label>
            <Input type="Text" placeholder="Username" />
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" placeholder="Password" />
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
    </View>
  );
};

export default Login;
