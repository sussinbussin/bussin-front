import {
  Menu,
  Box,
  Heading,
  Text,
  HStack,
  Pressable,
  VStack,
  Divider,
  Button,
  Select,
  Spinner,
} from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { GlobalContext } from "../contexts/global";
import dayjs from "dayjs";
import { useRecommenderAPI } from "../api/RouteRecommender";

const PickupSearch = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setLoading] = useState(false);

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
  const showDateTimePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDateTimePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDateTimeSelect = (date) => {
    setDate(date);
    hideDateTimePicker();
  };
  const isBookDisabled = () => {
    return !(state.pickup.item && state.dest.item && date);
  };

  /*
   *
   * Booking
   * */
  const handleBook = async () => {
    setLoading(true);

    const { recommend } = useRecommenderAPI(state.token);

    const result = await recommend({
      originLat: state.pickup.geo.lat,
      originLng: state.pickup.geo.lng,
      destLat: state.dest.geo.lat,
      destLng: state.dest.geo.lng,
    });

    if (!result) return;
    let routes = result["Recommended Driver Routes"];
    dispatch({
      type: "SET_ROUTES",
      payload: routes,
    });
    dispatch({
      type: "MODIFY_STAGE",
      payload: {
        ...state.stage,
        level: "CHOOSING_DRIVER",
        display: "recommend",
      },
    });
  };

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

        <HStack>
          <Button
            onPress={showDateTimePicker}
            style={{
              paddingLeft: 0,
            }}
          >
            {dayjs(date).format("DD/MM h:mma")}
          </Button>
        </HStack>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleDateTimeSelect}
          onCancel={hideDateTimePicker}
        />

        {!isLoading && (
          <Button
            style={{
              marginTop: 10,
            }}
            _text={{
              fontSize: "md",
            }}
            variant="outline"
            isDisabled={isBookDisabled()}
            onPress={handleBook}
          >
            Search
          </Button>
        )}
        {isLoading && <Spinner></Spinner>}
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
