import { View, Heading, Text } from "native-base";
import TopBar from "../components/TopBarBack";

const BookingSuccess = () => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBar></TopBar>
      <Heading>Successful Booking!</Heading>
    </View>
  );
};

export default BookingSuccess;
