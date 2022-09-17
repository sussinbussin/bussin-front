import { View } from "react-native";
import {
  Text,
  Box,
  Button,
  Heading,
  FormControl,
  Input,
  Stack,
  Center,
} from "native-base";

const Login = ({ navigation }) => {
  const submit = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Box
        w="100%"
        maxWidth="300px"
        bgColor="muted.50"
        style={{
          padding: 30,
        }}
      >
        <Stack mx="10">
          <Center>
            <Heading style={{ margin: 10 }}>Bussin</Heading>
            <FormControl.Label style={{ alignItems: "center" }}>
              Username
            </FormControl.Label>
            <Input type="Text" placeholder="Username" />
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" placeholder="Password" />
            <Button onPress={submit} w="100%" style={{ marginTop: 30 }}>
              Sign In
            </Button>
          </Center>
        </Stack>
      </Box>
    </View>
  );
};

export default Login;
