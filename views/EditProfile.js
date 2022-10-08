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
import { RegisterName } from "./RegisterName";

// function ManageUsername({ navigation }) {
//     const usernameContext = useContext(RegisterName);

//     // const editedUsername = ???? need route or smth is it
// };

const EditProfile = ({navigate, route}) => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.editProfile) return null;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // idk how to call from db or something?
  const [name, setName] = useState(route.params.name);
  const [number, setNumber] = useState("88888888");
  const [email, setEmail] = useState("jolene@gmail.com");

  const handleName = (newName) => setName(newName);
  const submit = () => {
    // TODO: save updated details????
    console.log(name);

    // TODO: save updated name / details in db, reflect in profile
    navigation.navigate("Profile", {name:name});
    return name;

  };
  // TODO: add edit / save button to confirm changes
  // and update details accordingly???? idk man

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
            onChangeText={handleName}
            value={name}
            variant="underlined"
            size="lg"
          />
          <FormControl.Label>Mobile Number</FormControl.Label>
          <Input
            type="text"
            keyboardType="numeric"
            onChangeText={setNumber}
            value={number}
            maxLength={8}
            variant="underlined"
            size="lg"
          />

          <FormControl.Label>Email Address</FormControl.Label>
          <Input
            type="text"
            onChangeText={setEmail}
            value={email}
            variant="underlined"
            size="lg"
          />

          <Button
            onPress={submit}
            w="100%"
            style={{ marginTop: 25 }}
            variant="outline"
          >
            Save changes
          </Button>
        </Stack>
      </Box>
    </View>
  );
};

export default EditProfile;
