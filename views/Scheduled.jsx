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
  List,
  FlatList,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import TopBarBack from "../components/TopBarBack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalContext } from "../contexts/global";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useUserApi } from "../api/UsersApi";
import dayjs from "dayjs";
import arraySupport from "dayjs/plugin/arraySupport";
import * as SecureStore from "expo-secure-store";

// function compare(a, b) {
//   if (a.date == b.date) {
//     if (a.time == b.time) {
//       return 1;
//     } else {
//       return -1;
//     }
//   } else if (a.date < b.date) {
//     return 1;
//   } else {
//     return -1;
//   }
// }

function compare( a, b ) {
  return new Date(b.date) - new Date(a.date)
}

const getScheduledRides = async (setData) => {
  let token = await SecureStore.getItemAsync("idToken");

  let uuid = await SecureStore.getItemAsync("uuid");
  let user = await useUserApi(token, uuid).getFullUserByUuid(uuid);

  let today = dayjs();
  dayjs.extend(arraySupport);
  const plannedRides = user.rides;
  console.log(plannedRides);

  // TODO: incorporate the public transport details
  // mode and estiamted duration?

  let rides = [];
  for (let i = 0; i < plannedRides.length; i++) {
    // console.log(plannedRides[i].plannedRoute.dateTime[1]);
    plannedRides[i].plannedRoute.dateTime[1] -= 1;
    let date = dayjs(plannedRides[i].plannedRoute.dateTime.slice(0, 5));
    let status = ""; // check status thing
    if (plannedRides[i].plannedRoute.rides.length == 0) {
      if (date < today) {
        status = "Past";
      } else {
        status = "Upcoming";
      }
    } else {
      if (date < today) {
        status = "Past";
      } else {
        status = "Upcoming";
      }
    }

    rides.push({
      id: plannedRides[i].id,
      noPassengers: plannedRides[i].passengers,
      cost: plannedRides[i].cost,
      // date: plannedRides[i].plannedRoute.dateTime, // wtf?
      date: date.format("DD/MM/YYYY"),
      time: date.format("hh:mmA"),
      // time: plannedRides[i].plannedRoute.dateTime,
      from: plannedRides[i].rideFrom,
      to: plannedRides[i].rideTo,
      status: status,
      plannedRoute: {
        id: "",
        // kiv
        from: "",
        to: "",
        date: "",
        time: "",
        driver: plannedRides[i].plannedRoute.driver,
      },
    });
  }

  setData(rides.sort(compare));
};

const Scheduled = () => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.scheduledRides) return null;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  useEffect(() => {
    getScheduledRides(setData);
  }, []);

  const renderItem = ({ item }) => (
    <List style={{ paddingTop: 20, paddingBottom: 20 }}>
      <View style={{ marginLeft: 15 }}>
        <View flexDirection="row" style={{ marginBottom: 5 }}></View>
        <View flexDirection="row" style={{ marginBottom: 5 }}>
          <Text fontSize="md" style={{ marginRight: 5 }}>
            From:
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {item.from}
          </Text>
        </View>
        <View flexDirection="row" style={{ marginBottom: 5 }}>
          <Text fontSize="md" style={{ marginRight: 23 }}>
            To:
          </Text>
          {/* <AntDesign
            name="arrowright"
            size={20}
            color="white"
            style={{ marginLeft: 5, marginRight: 5, marginTop: 2.5 }}
          /> */}
          <Text fontSize="md" fontWeight="bold">
            {item.to}
          </Text>
        </View>

        <View flexDirection="row" style={{ marginBottom: 18 }}>
          <AntDesign
            name="wallet"
            size={20}
            color="white"
            style={{ marginRight: 7, marginTop: 2.75 }}
          />
          <Text fontSize="md" fontWeight="bold">
            ${item.cost}
          </Text>
        </View>

        <View flexDirection="row" style={{ marginBottom: 5 }}>
          <AntDesign
            name="calendar"
            size={20}
            color="white"
            style={{ marginRight: 7 }}
          />
          <Text>{item.date}</Text>
        </View>

        <View flexDirection="row" style={{ marginBottom: 5 }}>
          <AntDesign
            name="clockcircleo"
            size={20}
            color="white"
            style={{ marginRight: 7 }}
          />
          <Text>{item.time}</Text>
        </View>

        <View flexDirection="row">
          <AntDesign
            name="user"
            size={20}
            color="white"
            style={{ marginRight: 7 }}
          />
          <Text>{item.noPassengers} Passenger</Text>
          <Text
            fontSize="md"
            fontWeight="semibold"
            textAlign="right"
            flex="1"
            marginRight="5"
          >
            {item.status}
          </Text>
        </View>

        <Text>{item.name}</Text>
      </View>
    </List>
  );

  return (
    <View>
      <TopBarBack></TopBarBack>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          paddingBottom: 10,
          marginLeft: 17,
        }}
      >
        My Rides
      </Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{
          marginLeft: 15,
          marginRight: 15,
          paddingBottom: 30,
          height: "80%",
        }}
        extraData
      />
      {/* padding thing idk how change */}
      <Box style={{ height: 100 }}></Box>
    </View>
  );
};

export default Scheduled;
