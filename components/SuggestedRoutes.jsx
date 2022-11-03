import { Box, Heading, Text, Button, View, HStack } from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import { GlobalContext } from "../contexts/global";
import { useContext, useEffect } from "react";
import { Carousel, Pagination } from "react-native-snap-carousel";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const SuggestedRoutes = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { height, width } = Dimensions.get("screen");
  const [currentIndex, setCurrentIndex] = useState(0);

  //TODO: implement get req from driver +  skeleton
  const renderSuggestions = ({ item, index }) => {
    if (item.carModel) {
      console.log(item);
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
      console.log("ROUTES");
      console.log(item);
      return (
        <Box style={styles.box}>
          <Heading>Public Transport</Heading>
          <Text fontSize="md">${item.cost}</Text>

          <HStack>
            {item.route.map((val, index) => {
              if (val.transportMode == "walking") {
                return (
                  <MaterialIcons
                    name="directions-walk"
                    size={24}
                    color="white"
                  />
                );
              }

              if (val.transportMode == "bus") {
                return (
                  <MaterialIcons
                    name="directions-bus"
                    size={24}
                    color="white"
                  />
                );
              }
            })}
          </HStack>
          <Button variant="outline" onPress={handleSubmit}>
            Book
          </Button>
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
    console.log(state.routes[index]);

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
  const handleSubmit = () => {};
  useEffect(() => {
    console.log(state.routes[currentIndex]);
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
    const formData = {
      userUUID: state.user.id,
      plannedRouteUUID: "fill later",
      rideDTO: {
        passengers: 1,

      }

    };
  }, []);

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
