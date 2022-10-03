import { Heading, Box, Flex, Pressable } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';

const HomeTopBar = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("Profile");
  }
  return (
    <Flex
      style={{
        marginTop: insets.top + 15,
        paddingBottom: 10,
        backgroundColor: 0,
        width: "100%",
      }}
      flexDirection="row"
    >
      <Box style={{ flex: 1, backgroundColor: 0 }}></Box>
      <Heading style={{ flex: 1, textAlign: "center" }}>Bussin.</Heading>
      <Box style={{ flex: 1, backgroundColor: 0 }}>
        <Pressable onPress={ handleNavigate }>
          <AntDesign
            name="user"
            size={28}
            color="white"
            style={{
              textAlign: "right",
              marginRight: 20,
            }}
          />
        </Pressable>
      </Box>
    </Flex>
  );
};

export default HomeTopBar;
