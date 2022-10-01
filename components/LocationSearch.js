import { Heading, View, Box, Input, VStack, FlatList, Text } from "native-base";
import { useEffect, useState, useCallback } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { usePlacesAPI } from "../api/PlacesAPI.js";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const LocationSearch = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [startingLocation, setStartingLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { findPlaces } = usePlacesAPI(startingLocation);
  const debouncedLocation = useDebounce(startingLocation, 1000);

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

  useEffect(() => {
    const getPlaces = async () => {
      const results = await findPlaces();
      setSuggestions(results.predictions);
    };

    getPlaces();
  }, [debouncedLocation]);

  const handleStartingLocation = (event) => {
    setStartingLocation(event);
  };

  const generateSuggestions = () => {
    if (suggestions.length == 0) return null;
    return (
      <FlatList
        data={suggestions}
        renderItem={({ item }) => (
          <Box borderBottomWidth="1" borderColor="muted.600">
            <Text fontSize="md">{item.structured_formatting.main_text}</Text>
            <Text fontSize="sm">
              {item.structured_formatting.secondary_text}
            </Text>
          </Box>
        )}
      />
    );
  };
  return (
    <Box style={{ ...styles.map, marginTop: keyboardStatus ? 0 : "auto" }}>
      <Input
        placeholder="Where to?"
        style={styles.input}
        variant="underlined"
        size="lg"
        onChangeText={handleStartingLocation}
      />
      {generateSuggestions()}
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
