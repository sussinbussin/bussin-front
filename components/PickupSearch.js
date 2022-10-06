import {
  Box,
  Heading,
  Text,
  HStack,
  Pressable,
  VStack,
  Divider,
  Button,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { GlobalContext } from "../contexts/global";
const PickupSearch = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
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
  /**
   *
   * Datepicker
   */
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const isBookDisabled = () => {
    return !(state.pickup.item && state.dest.item);
  }
  /**
   * TODO: Add Datetime and passenger amt
   * TODO: make it such that pickup and drop off cant be the same
   */
  return (
    <Box style={{ ...styles.box, marginTop: keyboardStatus ? 0 : "auto" }}>
    <VStack>
    <Text bold fontSize="lg">
    Select your pickup location:
    </Text>
    <Pressable onPress={handleSelectPickupWithSearch}>
    {({ isPressed }) => {
      return (
        <HStack style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}>
        <Text fontSize="md" bold style={styles.text}>
        From:{" "}
        </Text>
        {state.pickup.item ? (
          <Text
          fontSize="md"
          isTruncated
          maxWidth="250"
          style={styles.text}
          >
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
        <Text fontSize="md" bold style={styles.text}>
        To:{" "}
        </Text>
        <Text
        fontSize="md"
        isTruncated
        maxWidth="300"
        style={styles.text}
        >
        {state.dest.item.structured_formatting.main_text}
        </Text>
        </HStack>
      );
    }}
    </Pressable>
    <HStack></HStack>
    <Button
    style={{
      marginTop: 10,
    }}
    _text={{
      fontSize: "md",
    }}
    variant="outline"
    isDisabled={isBookDisabled()}
    >
    Book
    </Button>
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
  text: {
    paddingTop: 3,
    paddingBottom: 3,
  },
});
export default PickupSearch;
