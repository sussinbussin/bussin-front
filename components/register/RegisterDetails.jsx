import {
  Heading,
  View,
  Text,
  Stack,
  FormControl,
  Input,
  Button,
} from "native-base";
import { useContext, useState } from "react";
import { RegisterContext } from "../../contexts/register";
import TopBarBack from "../TopBarBack";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from "dayjs";

const RegisterDetails = ({ navigation }) => {
  const state = useContext(RegisterContext);
  const [email, setEmail] = useState("");
  const [nric, setNric] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);

  const showDateTimePicker = () => {
    setDatePicker(true);
  };
  const hideDateTimePicker = () => {
    setDatePicker(false);
  };
  const handleDateTimeSelect = (date) => {
    setDate(date);
    setDatePicker(false);
  };

  const handleNext = () => {
    state.nric = nric;
    state.email = email;
    state.mobile = mobile;
    state.username = username;
    state.date = date;
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
          Username
        </FormControl.Label>
        <Input
          value={username}
          onChangeText={(event) => setUsername(event)}
          variant="underlined"
          size="lg"
          placeholder="jomemes123"
        />
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
          onChangeText={(event) => setNric(event)}
          variant="underlined"
          size="lg"
          placeholder="S6969696Z"
        />
        <FormControl.Label style={{ alignItems: "center" }}>
          Mobile
        </FormControl.Label>
        <Input
          value={mobile}
          onChangeText={(event) => setMobile(event)}
          variant="underlined"
          size="lg"
          placeholder="99696969"
        />
        <FormControl.Label style={{ alignItems: "center" }}>
          Mobile
        </FormControl.Label>
        <Button
          onPress={showDateTimePicker}
          style={{
            paddingLeft: 0,
          }}
        >
          {dayjs(date).format("DD/MM/YYYY")}
        </Button>
        <DateTimePickerModal
          isVisible={datePicker}
          mode="date"
          onCancel={hideDateTimePicker}
          onConfirm={handleDateTimeSelect}
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
