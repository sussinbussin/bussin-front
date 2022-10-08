import {
  Text,
  Box,
  Button,
  Heading,
  FormControl,
  Input,
  Stack,
  Center,
  View,
  Pressable,
  Flex,
} from "native-base";
import { TouchableHighlight, Image } from "react-native";
import { useContext, useState } from "react";
import TopBar from "../components/TopBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalContext } from "../contexts/global";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

const BookingConfirmation = () => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.bookingConfirmation) return null;

  return (
    <View>
      <TopBar></TopBar>

      <View>
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/e0/22/db/e022db0512115c36809c0848c85f80c6.jpg",
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
};

export default BookingConfirmation;
