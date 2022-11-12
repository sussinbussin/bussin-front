import { Heading, Box, Flex, Pressable } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

/**
 * The bar on top of the application, together with the back bar
 */
const TopBarBack = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const backNavigate = () => {
    navigation.goBack()
  };
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
        
      <Box style={{ flex: 1, backgroundColor: 0 }}>
        <Pressable onPress={backNavigate}>
          <AntDesign
            name="left"
            size={20}
            color="white"
            style={{
              textAlign: "left",
              marginLeft: 25,
              marginTop: 1,
            }}
          />
        </Pressable>
      </Box>
      <Heading style={{ flex: 1, textAlign: "center", backgroundColor: 0}}>Bussin.</Heading>
      <Box style={{ flex: 1, backgroundColor: 0 }}></Box>

    </Flex>
  );
};

export default TopBarBack;
