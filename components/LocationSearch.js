import { Heading, View, Box, Input } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, Keyboard } from "react-native";

const LocationSearch = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    const keyShowSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const keyHideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      keyHideSubscription.remove();
      keyShowSubscription.remove();
    };
  }, []);

  return (
    <Box style={{ ...styles.map, marginTop: keyboardStatus ? 0 : "auto" }}>
      <Input
        placeholder="Where to?"
        style={styles.input}
        variant="underlined"
        size="lg"
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "90%",
    padding: 15,
    marginBottom: 90,
    borderRadius: 10,
  },
  input: {},
});
export default LocationSearch;
