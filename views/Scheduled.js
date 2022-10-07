import { View, Box, Center, Heading } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Scheduled = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box style={{ paddingTop: insets.top, paddingBottom: 10 }}>
        <Center>
          <Heading>Scheduled</Heading>
        </Center>
      </Box>
    </View>
  );
};

export default Scheduled;
