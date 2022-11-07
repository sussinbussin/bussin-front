import {
  Box,
  Heading,
  Text,
  Button,
  View,
  VStack,
  HStack,
} from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import { GlobalContext } from "../contexts/global";
import { useContext, useEffect, useRef } from "react";
import { Carousel, Pagination } from "react-native-snap-carousel";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRideApi } from "../api/RideApi";
import dayjs from "dayjs";

const SuggestedRoutes = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { height, width } = Dimensions.get("screen");
  const [currentIndex, setCurrentIndex] = useState(0);
  const actionRef = useRef();
  //TODO: implement get req from driver +  skeleton
  const renderSuggestions = ({ item, index }) => {
    if (item.carModel) {
      return (
        <Box style={styles.box}>
          <Heading>{item.driver}</Heading>
          <Text fontSize="md">{item.carModel}</Text>
          <Text fontSize="md">{item.carPlate}</Text>
          <Text fontSize="md">${item.cost.toFixed(2)}</Text>
          <Button variant="outline" onPress={handleSubmit}>
            Book
          </Button>
        </Box>
      );
    }

    //public transport
    if (item.route) {
      return (
        <Box style={styles.box}>
          <Heading>Public Transport</Heading>
          <Text fontSize="md">${item.cost}</Text>

          <VStack>
            {item.route.map((val, index) => {
              if (val.transportMode == "walking") {
                return (
                  <HStack>
                  <MaterialIcons
                    key={index}
                    name="directions-walk"
                    size={24}
                    color="white"
                  />
                      <Text>Walk</Text>
                  </HStack>
                );
              }

              if (val.transportMode == "bus") {
                return (
                  <HStack>
                  <MaterialIcons
                    key={index}
                    name="directions-bus"
                    size={24}
                    color="white"
                  />
                      <Text>
                      {val.service}:{val.origin} - {val.dest}
                    </Text>
                  </HStack>
                );
              }
              if (val.transportMode == "mrt") {
                return (
                  <HStack>
                  <MaterialIcons
                    key={index}
                    name="directions-train"
                    size={24}
                    color="white"
                  />
                      <Text>
                      {val.origin} - {val.dest}
                    </Text>
                  </HStack>
                );
              }
            })}
          </VStack>

        </Box>
      );
    }
  };

  const generatePagination = () => {
    //dont show pagination if more than 7 its too weird
    if (state.routes.length > 7) {
      return;
    }
    return (
      state.routes && (
        <Pagination
          dotsLength={state.routes.length}
          activeDotIndex={currentIndex}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: "rgba(255, 255, 255, 0.92)",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      )
    );
  };

  //TODO: handle change map view
  const handleSnap = (index) => {
    setCurrentIndex(index);

    let payload = [];
    let mapPayload = [];
    let route = state.routes[index];
    // format the lat long properly

    if (route.route) {
      route.route.map((item) => {
        payload.push({
          lat: item.originLatitude,
          lng: item.originLongitude,
        });
        payload.push({
          lat: item.destLatitude,
          lng: item.destLongitude,
        });
        mapPayload.push({
          latitude: item.destLatitude,
          longitude: item.destLongitude,
        });
      });
    }
    if (route.carPlate) {
      payload.push({
        lat: route.originLatitude,
        lng: route.originLongitude,
      });
      payload.push({
        lat: route.destLatitude,
        lng: route.destLongitude,
      });
    }

    dispatch({ type: "SET_MARKERS", payload: payload });
    dispatch({
      type: "SET_MAP",
      payload: mapPayload,
    });
  };
  //TODO: handle submit request
  const handleSubmit = async () => {
    //{
    //"userUUID": "844b8d14-ef82-4b27-b9b5-a5e765c1254f",
    //"plannedRouteUUID": "844b8d14-ef82-4b27-b9b5-a5e765c1254f",
    //"rideDTO": {
    //"id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //"timestamp": "2022-11-03T13:08:21.086Z",
    //"passengers": 2,
    //"cost": 3,
    //"rideFrom": "place_id:ChIJ483Qk9YX2jERA0VOQV7d1tY",
    //"rideTo": "place_id:ChIJ483Qk9YX2jERA0VOQV7d1tY"
    //}
    //}
    let date = dayjs(state.routes[currentIndex].dateTime);
    const formData = {
      userUUID: state.user.id,
      plannedRouteUUID: state.routes[currentIndex].id,
      rideDTO: {
        passengers: 1,
        cost: state.routes[currentIndex].cost.toFixed(2),
        timestamp: date.toISOString(),
        rideFrom: state.pickup.item.place_id,
        rideTo: state.dest.item.place_id,
      },
    };

    const { createRide } = useRideApi(state.token);
    let result = await createRide(formData);
    if (!result) return;

    navigation.navigate("Scheduled");
  };
  useEffect(() => {}, []);

  //fix bug swipe with whole screen
  return (
    state.routes && (
      <View
        style={{
          height: 280,
          marginTop: "auto",
          backgroundColor: 0,
        }}
      >
        <Carousel
          style={styles.carousel}
          data={state.routes}
          renderItem={renderSuggestions}
          sliderWidth={width}
          itemWidth={width * 0.8}
          onSnapToItem={handleSnap}
          layout="default"
        />
        {generatePagination()}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 15,
    borderRadius: 10,
  },
});
export default SuggestedRoutes;
