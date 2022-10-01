import { Heading, Box, Flex } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
const HomeTopBar = () => {
  const insets = useSafeAreaInsets();
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
        <AntDesign
          name="user"
          size={28}
          color="white"
          style={{
            textAlign: "right",
            marginRight: 20,
          }}
        />
      </Box>
    </Flex>
  );
};

export default HomeTopBar;
