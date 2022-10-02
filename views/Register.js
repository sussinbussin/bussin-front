import {
  Alert,
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

import { useContext, useState } from "react";
import { FlagContext } from "../contexts/flags";
import TopBar from "../components/TopBar";

const Register = ({ navigation }) => {
  const flag = useContext(FlagContext);
  if (!flag.register) return null;

  const [phoneNum, setPhoneInvalid] = useState({
    phoneNum: false,
    confirmPhone: false,
  });

  const handlePhone = (value) => setPhoneInvalid(value);

  const submit = () => {
    // TODO: handle invalid input
    // prolly need to check starting numbers too
    // need to convert phoneNum to int
    const phoneIsValid = phoneNum.length === 8;

    if (!phoneIsValid) {
      //Alert.alert('rip invalid number');
      console.log("bruh.");
      setPhoneInvalid({
        phoneNum: !phoneIsValid,
        confirmPhone: !phoneIsValid,
      });
      console.log(phoneNum);
      return;
    } else {
      console.log(phoneNum);
      navigation.navigate("Login");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBar></TopBar>
      <Heading size="xl" style={{ paddingTop: 30 }}>
        Register
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
              Phone number
            </FormControl.Label>
            <Input
              type="Text"
              placeholder="Phone number"
              keyboardType="numeric"
              onChangeText={handlePhone}
            />

            <Button
              onPress={() => {
                submit();
                // idk how to navigate only if successful
                navigation.navigate("RegisterName");
              }}
              w="100%"
              style={{ marginTop: 25 }}
              variant="outline"
            >
              Continue
            </Button>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
              <View>
                <Text style={{ width: 50, textAlign: "center", fontSize: 18 }}>
                  OR
                </Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: "white" }} />
            </View>

            <Button
              // TODO: sign up with email
              onPress={submit}
              w="100%"
              style={{ marginTop: 30 }}
              variant="outline"
            >
              Sign up with Email
            </Button>

            <Button
              // TODO: sign up with gmail?
              onPress={submit}
              w="100%"
              style={{ marginTop: 22 }}
              variant="outline"
            >
              Sign up with Google
            </Button>
          </Center>
        </Stack>
      </Box>

      <View>
        <Center>
          <Text style={{ marginTop: 9 }} fontSize="15">
            Already have an account?
          </Text>
          <Text
            onPress={() => {
              navigation.navigate("Login");
            }}
            textAlign="center"
            paddingTop="7.5"
            w="100%"
            fontSize="17"
            fontWeight="bold"
          >
            LOGIN
          </Text>
        </Center>
      </View>
    </View>
  );
};

export default Register;
