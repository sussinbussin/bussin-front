import { Box, Heading, Text, HStack, Pressable, VStack } from "native-base";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { GlobalContext } from "../contexts/global";
import { usePlacesAPI } from "../api/PlacesAPI";
const PickupSearch = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [geometry, setGeometry] = useState();
  const { getGeometry } = usePlacesAPI(state.destination.place_id);

  useEffect(() => {
    const keyShowSubscription = Keyboard.addListener("keyboardWillShow", () => {
      setKeyboardStatus(true);
    });
    const keyHideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardStatus(false);
    });

    const getDestination = async () => {
      const results = await getGeometry();
      setGeometry(results);
    };
    getDestination();
    return () => {
      keyHideSubscription.remove();
      keyShowSubscription.remove();
    };
  }, []);

  const handleBackToDestination = () => {
    dispatch({ type: "DESTINATION_STAGE" });
  };
  return (
    <Box style={{ ...styles.box, marginTop: keyboardStatus ? 0 : "auto" }}>
      <VStack>
        <Pressable onPress={handleBackToDestination}>
          {({ isPressed }) => {
            return (
              <HStack style={{ transform: [{ scale: isPressed ? 0.96 : 1 }] }}>
                <Text bold>To: </Text>
                <Text isTruncated>
                  {state.destination.structured_formatting.main_text}
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
