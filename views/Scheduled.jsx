import { Text, Box, View, List, FlatList } from "native-base";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import TopBarBack from "../components/TopBarBack";
import { GlobalContext } from "../contexts/global";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useUserApi } from "../api/UsersApi";
import dayjs from "dayjs";
import arraySupport from "dayjs/plugin/arraySupport";
import { usePlacesAPI } from "../api/PlacesAPI";

function compare(a, b) {
  return new Date(b.date) - new Date(a.date);
}

const getScheduledRides = async (setData, state) => {
  const { getFullUserByUuid } = useUserApi(state.token);
  const user = await getFullUserByUuid(state.user.id);

  let today = dayjs();
  dayjs.extend(arraySupport);
  const plannedRides = user.rides;

  let rides = [];
  for (let ride of plannedRides) {
    let date = dayjs(ride.timestamp);
    let status = "";

    // check status of bookings
    if (plannedRides.length == 0) {
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

    // get details of each ride
    const to = await usePlacesAPI(ride.rideTo).getDetails();
    const from = await usePlacesAPI(ride.rideFrom).getDetails();
    // timezone
    date = date.add(8, "hour");
    rides.push({
      id: ride.id,
      noPassengers: ride.passengers,
      cost: ride.cost,
      date: date.format("DD/MM/YYYY"),
      time: date.format("hh:mmA"),
      from: from,
      to: to,
      status: status,
    });
  }

  setData(rides.sort(compare));
};

const Scheduled = () => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.scheduledRides) return null;
  const [data, setData] = useState([]);

  useEffect(() => {
    getScheduledRides(setData, state);
  }, []);

  const renderItem = ({ item }) => (
    <List
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: "muted.300",
      }}
    >
      <View style={{ marginLeft: 15 }}>
        <View flexDirection="row" style={styles.view}></View>
        <View flexDirection="row" style={styles.view}>
          <Text fontSize="md" style={{ marginRight: 5 }}>
            From:
          </Text>
          <Text fontSize="md" fontWeight="bold" isTruncated maxWidth="250">
            {item.from.name}
          </Text>
        </View>
        <View flexDirection="row" style={styles.view}>
          <Text fontSize="md" style={{ marginRight: 23 }}>
            To:
          </Text>
          <Text fontSize="md" fontWeight="bold" isTruncated maxWidth="250">
            {item.to.name}
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

        <View flexDirection="row" style={styles.view}>
          <AntDesign
            name="calendar"
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text>{item.date}</Text>
        </View>

        <View flexDirection="row" style={styles.view}>
          <AntDesign
            name="clockcircleo"
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text>{item.time}</Text>
        </View>

        <View flexDirection="row">
          <AntDesign name="user" size={20} color="white" style={styles.icon} />
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

      <Box style={{ height: 100 }}></Box>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 7,
  },

  view: {
    marginBottom: 5,
  },
});

export default Scheduled;
