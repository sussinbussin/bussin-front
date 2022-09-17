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

const Login = ({ navigation }) => {
  const submit = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Box
        w="100%"
        maxWidth="300px"
        style={{
          marginTop: 30,
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
              variant="outlined"
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
