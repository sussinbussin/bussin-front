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
  Pressable,
  Flex,
} from "native-base";
import { TouchableHighlight, Image } from "react-native";
import { useContext, useState } from "react";
import TopBarBack from "../components/TopBarBack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalContext } from "../contexts/global";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useUserApi } from "../api/UsersApi";
import * as SecureStore from "expo-secure-store";

const EditProfile = ({ navigate, route }) => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.editProfile) return null;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [rendered, setRendered] = useState(false);

  const [uuid, setUuid] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [nric, setNric] = useState("");
  const [dob, setDob] = useState("");
  const [isDriver, setDriver] = useState(false);

  // to show user when their input is wrong / successful etc
  const [phoneColor, setPhoneColor] = useState("white");
  const [emailColor, setEmailColor] = useState("white");
  const [buttonMessage, setButtonMessage] = useState("Save changes");

  const renderDefaults = async () => {
    let token = await SecureStore.getItemAsync("idToken");
    let uuid = await SecureStore.getItemAsync("uuid");
    let user = await useUserApi(token).getFullUserByUuid(uuid);

    setUuid(user.id);
    setName(user.name);
    setMobile(user.mobile);
    setEmail(user.email);
    setNric(user.nric);
    setDob(user.dob);
    setDriver(user.isDriver);

    setRendered(true);
  };
  if (!rendered) {
    renderDefaults();
  }

  const submit = async () => {
    // check if valid phone number
    const phoneIsValid =
      mobile.length === 8 &&
      (mobile.toString().indexOf("8") === 0 ||
        mobile.toString().indexOf("9") === 0);

    // check email validity
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emailIsValid = emailRegex.test(email);

    // TODO: check name & address valid?

    // change text colors if anything is invalid
    if (!phoneIsValid) {
      setPhoneColor("red.500");
    } else {
      setPhoneColor("white");
    }

    if (!emailIsValid) {
      setEmailColor("red.500");
    } else {
      setEmailColor("white");
    }

    // if all valid, proceed to Put request
    if (phoneIsValid && emailIsValid) {
      let userDTO = {
        nric: nric,
        name: name,
        dob: dob,
        mobile: mobile,
        email: email,
        isDriver: isDriver,
      };

      let token = await SecureStore.getItemAsync("idToken");

      let user = await useUserApi(token).updateUser(uuid, userDTO);

      // if user...
      if (user) {
        console.log("put works");
        setButtonMessage("Profile updated!");
      } else {
        console.log("rip put doesn't work");
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBarBack></TopBarBack>
      <View>
        <AntDesign
          name="user"
          size={60}
          color="white"
          style={{ marginLeft: 25, marginRight: 25, marginTop: 5 }}
        />
      </View>

      <Box
        w="100%"
        maxWidth="500px"
        style={{
          marginTop: 20,
        }}
        variant="light"
      >
        <Stack mx="10">
          <FormControl.Label>Name</FormControl.Label>
          <Input
            type="text"
            onChangeText={setName}
            value={name}
            variant="underlined"
            size="lg"
          />
          <FormControl.Label>Mobile Number</FormControl.Label>
          <Input
            type="text"
            keyboardType="numeric"
            onChangeText={setMobile}
            value={mobile}
            maxLength={8}
            variant="underlined"
            size="lg"
            color={phoneColor}
          />

          <FormControl.Label>Email Address</FormControl.Label>
          <Input
            type="text"
            onChangeText={setEmail}
            value={email}
            variant="underlined"
            size="lg"
            color={emailColor}
          />

          <Button
            onPress={submit}
            w="100%"
            style={{ marginTop: 25 }}
            variant="outline"
          >
            {buttonMessage}
          </Button>
        </Stack>
      </Box>
    </View>
  );
};

export default EditProfile;
