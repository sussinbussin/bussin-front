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
import TopBarBack from "../TopBarBack";

const RegisterDetails = ({ navigation }) => {
  const state = useContext(RegisterContext);
  const [email, setEmail] = useState("");
  const [nric, setNric] = useState("");
  const [mobile, setMobile] = useState("");

  const handleNext = () => {
    state.nric = nric;
    state.email = email;
    state.mobile = mobile;
    navigation.navigate("RegisterPassword");
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBarBack></TopBarBack>
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
        <Input
          value={email}
          onChangeText={(event) => setEmail(event)}
          variant="underlined"
          size="lg"
          placeholder="jomeme@gmail.com"
        />
        <FormControl.Label style={{ alignItems: "center" }}>
          NRIC
        </FormControl.Label>
        <Input
          value={nric}
          variant="underlined"
          size="lg"
          placeholder="S6969696Z"
        />
        <FormControl.Label style={{ alignItems: "center" }}>
          Mobile
        </FormControl.Label>
        <Input
          value={mobile}
          variant="underlined"
          size="lg"
          placeholder="99696969"
        />

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
