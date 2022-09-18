import { Heading, View, Box, HStack, Center } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Box style={{ paddingTop: insets.top }}>
        <Heading>Hello</Heading>
      </Box>
    </View>
  );
};

export default Home;
