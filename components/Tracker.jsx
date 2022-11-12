import { Box, Text, HStack } from "native-base";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { GlobalContext } from "../contexts/global";
import AntDesign from "@expo/vector-icons/AntDesign";

const Tracker = () => {
  const { state } = useContext(GlobalContext);

  // to check status of ride
  const getText = () => {
    if (state.tracker.status == "started") {
      return "Your driver is on the way to you";
    }
    if (state.tracker.status == "picked") {
      return "You are on your way";
    }
  };
  return (
    <Box style={styles.box}>
      <HStack>
        <AntDesign
          size={20}
          name="exclamationcircleo"
          style={{ padding: 10 }}
          color="white"
        />
        <Text fontSize="lg" style={{ paddingTop: 7 }}>
          {getText()}
        </Text>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "90%",
    borderRadius: 10,
    padding: 5,
  },
});

export default Tracker;
