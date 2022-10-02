import {
  Heading,
  View,
  Box,
  Input,
  VStack,
  FlatList,
  Text,
  Pressable,
} from "native-base";
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { usePlacesAPI } from "../api/PlacesAPI.js";
import { GlobalContext } from "../contexts/global.js";

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
  const { state, dispatch } = useContext(GlobalContext);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [destination, setDestination] = useState();
  const { findPlaces } = usePlacesAPI(search);
  const debouncedLocation = useDebounce(search, 300);

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
    setSearch(event);
  };

  //Start destination is set
  const handleStartDestination = (item) => {
    console.log(item);
    dispatch({ type: "PICKUP_STAGE", payload: item });
    Keyboard.dismiss();
    //setDestination(item);
    //search(item.structured_formatting.main_text);
    setSuggestions("");
  };

  const generateSuggestions = () => {
    if (suggestions.length == 0) return null;
    return (
      <FlatList
        data={suggestions}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleStartDestination(item)}>
            {({ isPressed }) => {
              return (
                <Box
                  borderBottomWidth="1"
                  borderColor="muted.600"
                  style={{
                    transform: [{ scale: isPressed ? 0.96 : 1 }],
                  }}
                >
                  <Text fontSize="md">
                    {item.structured_formatting.main_text}
                  </Text>
                  <Text fontSize="sm">
                    {item.structured_formatting.secondary_text}
                  </Text>
                </Box>
              );
            }}
          </Pressable>
        )}
      />
    );
  };

  return (
    <Box style={{ ...styles.map, marginTop: keyboardStatus ? 0 : "auto" }}>
      <Input
        placeholder="Where to, Jolene?"
        style={styles.input}
        variant="underlined"
        size="lg"
        value={search}
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
