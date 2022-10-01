import { Heading, View, Box, Input } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, Keyboard } from "react-native";

const LocationSearch = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [startingLocation, setStartingLocation] = useState("");

  useEffect(() => {
    const keyShowSubscription = Keyboard.addListener("keyboardWillShow", () => {
      setKeyboardStatus(true);
    });
    const keyHideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      keyHideSubscription.remove();
      keyShowSubscription.remove();
    };
  }, []);

  const handleStartingLocation = (event) => {
    setStartingLocation(event);
  };
  return (
    <Box style={{ ...styles.map, marginTop: keyboardStatus ? 0 : "auto" }}>
      <Input
        placeholder="Where to?"
        style={styles.input}
        variant="underlined"
        size="lg"
        onChange={handleStartingLocation}
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
