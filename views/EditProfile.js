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
import { useUserAPI } from "../api/UsersAPI";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const EditProfile = ({ navigate, route }) => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.editProfile) return null;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [rendered, setRendered] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [nric, setNric] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [isDriver, setDriver] = useState(false);

  // to show user when their input is wrong / successful etc
  const [phoneColor, setPhoneColor] = useState("white");
  const [emailColor, setEmailColor] = useState("white");
  const [buttonMessage, setButtonMessage] = useState("Save changes");
 
  const renderDefaults = async () => {
    let token = await SecureStore.getItemAsync("idToken");
    const decodedToken = jwtDecode(token);
    const { getUser } = useUserAPI(token, decodedToken.email);

    let user = await getUser();

    setId(user.id);
    setName(user.name);
    setMobile(user.mobile);
    setEmail(user.email);
    setNric(user.nric);
    setAddress(user.address);
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
      let userDTO = { id, nric, name, address, dob, mobile, email, isDriver };

      // i hardcoded token for this one when trying idk if it works
      let token = await SecureStore.getItemAsync("idToken");
      const decodedToken = jwtDecode(token);

      let user = await useUserAPI(token, decodedToken.email).updateUser(
        id,
        userDTO
      );

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
          color="pink"
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

          <FormControl.Label>Address</FormControl.Label>
          <Input
            type="text"
            onChangeText={setAddress}
            value={address}
            variant="underlined"
            size="lg"
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
