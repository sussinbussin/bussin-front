import {
  Heading,
  View,
  Text,
  Stack,
  FormControl,
  Input,
  Button,
} from "native-base";
import { useContext } from "react";
import { RegisterContext } from "../../contexts/register";
import TopBar from "../TopBar";

const RegisterDetails = ({ navigation }) => {
  const state = useContext(RegisterContext);

  const handleNext = () => {
    navigation.navigate("RegisterPassword");
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBar></TopBar>
      <Heading
        style={{
          alignSelf: "flex-start",
          paddingLeft: 30,
          paddingTop: 20,
        }}
        size="2xl"
      >
        Hello, {state.name}!
      </Heading>
      <Text
        style={{
          alignSelf: "flex-start",
          paddingLeft: 30,
        }}
      >
        We would like to hoard more details of you!
      </Text>
      <Stack
        w="85%"
        style={{
          marginTop: 30,
        }}
      >
        <FormControl.Label style={{ alignItems: "center" }}>
          Email
        </FormControl.Label>
        <Input variant="underlined" size="lg" placeholder="jomeme@gmail.com" />
        <FormControl.Label style={{ alignItems: "center" }}>
          NRIC
        </FormControl.Label>
        <Input variant="underlined" size="lg" placeholder="S6969696Z" />
        <FormControl.Label style={{ alignItems: "center" }}>
          Mobile
        </FormControl.Label>
        <Input variant="underlined" size="lg" placeholder="99696969" />

        <Button
          variant="outline"
          style={{ marginTop: 30 }}
          onPress={handleNext}
        >
          Next
        </Button>
      </Stack>
    </View>
  );
};

export default RegisterDetails;
