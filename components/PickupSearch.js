import {
  Box,
  Heading,
  Text,
  HStack,
  Pressable,
  VStack,
  Divider,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { GlobalContext } from "../contexts/global";
import { usePlacesAPI } from "../api/PlacesAPI";
const PickupSearch = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

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

  const handleBackToDestination = () => {
    dispatch({
      type: "MODIFY_STAGE",
      payload: {
        level: "CHOOSING_DESTINATION",
        display: "search",
        locationSearch: {
          text: "Where to?",
        },
      },
    });
  };

  const handleSelectPickupWithSearch = () => {
    dispatch({
      type: "MODIFY_STAGE",
      payload: {
        level: "CHOOSING_PICKUP",
        display: "search",
        locationSearch: {
          text: "Select a pickup point",
        },
      },
    });
  };
  return (
    <Box style={{ ...styles.box, marginTop: keyboardStatus ? 0 : "auto" }}>
      <VStack>
        <Text bold fontSize="md">
          Select your pickup location:
        </Text>
        <Pressable onPress={handleSelectPickupWithSearch}>
          {({ isPressed }) => {
            return (
              <HStack style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}>
                <Text bold>From: </Text>
                {state.pickup.item ? (
                  <Text isTruncated>
                    {state.pickup.item.structured_formatting.main_text}
                  </Text>
                ) : (
                  <Text></Text>
                )}
              </HStack>
            );
          }}
        </Pressable>
        <Divider />
        <Pressable onPress={handleBackToDestination}>
          {({ isPressed }) => {
            return (
              <HStack style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}>
                <Text bold>To: </Text>
                <Text isTruncated>
                  {state.destination.item.structured_formatting.main_text}
                </Text>
              </HStack>
            );
          }}
        </Pressable>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "90%",
    padding: 15,
    marginBottom: 90,
    borderRadius: 10,
  },
});
export default PickupSearch;
