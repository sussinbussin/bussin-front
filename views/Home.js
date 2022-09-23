import { Heading, View, Box, HStack, Center } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext } from "react";
import { FlagContext } from "../flags";
const Home = () => {
  const flag = useContext(FlagContext);
  if (!flag.home) return null;
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Box style={{ paddingTop: insets.top + 15 }}>
        <HStack space={2}>
          <Heading>Where to, Jolene?</Heading>
        </HStack>
      </Box>
    </View>
  );
};

export default Home;
