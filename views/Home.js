import { GOOGLE_API_KEY } from "@env";
import {
  Heading,
  View,
  Box,
  HStack,
  Center,
  Input,
  IconButton,
  Flex,
  VStack,
  Spacer,
  Modal,
} from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useEffect, useState, useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { GlobalContext } from "../contexts/global";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { mapStyle } from "../theming/mapStyle";
import LocationSearch from "../components/LocationSearch";
import HomeTopBar from "../components/HomeTopBar";
import PickupSearch from "../components/PickupSearch";
import MapViewDirections from "react-native-maps-directions";
const Home = ({ navigation }) => {
  const { state, dispatch } = useContext(GlobalContext);
  if (!state.flags.home) return null;
  const insets = useSafeAreaInsets();

  const [location, setLocation] = useState();
  const map = useRef();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5,
      });
      setLocation(location.coords);
    })();
  }, []);
  //move camera to pick up point
  useEffect(() => {
    if (state.pickup.geo == null) return;

    map.current.animateCamera(
      {
        center: {
          latitude: state.pickup.geo.lat,
          longitude: state.pickup.geo.lng,
        },
      },
      { duration: 300 }
    );
  }, [state.pickup.geo]);

  const bottomBar = () => {
    if (state.stage.display == "search")
      return <LocationSearch style={styles.search} />;
    if (state.stage.display == "pickup") return <PickupSearch />;
  };
  //TODO: FIX
  const generateDirections = () => {
    if (state.pickup.geo == null || state.dest.geo == null) return;
    return (
      <MapViewDirections
        origin={{
          latitude: state.pickup.geo.lat,
          longitude: state.pickup.geo.lng,
        }}
        desintation={{
          latitude: state.dest.geo.lat,
          longitude: state.dest.geo.lng,
        }}
        strokeWidth={3}
        strokeColor="white"
        apikey={GOOGLE_API_KEY}
        onStart={(params) => {
          console.log("started");
        }}
        onError={(error) => {
          console.error(error);
        }}
      />
    );
  };
  /**
   *
   * TODO: make the map expand according to the routes
   */
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: 0,
      }}
    >
      {location != null ? (
        <MapView
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          showsUserLocation={true}
          initialCamera={{
            center: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
            pitch: 0,
            heading: 0,
            zoom: 15,
            altitude: location.altitude,
          }}
          loadingEnabled
          ref={map}
        >
          {generateDirections()}
          {state.dest.geo ? (
            <Marker
              coordinate={{
                latitude: state.dest.geo.lat,
                longitude: state.dest.geo.lng,
              }}
              pinColor={"white"}
            ></Marker>
          ) : null}
          {state.pickup.geo ? (
            <Marker
              coordinate={{
                latitude: state.pickup.geo.lat,
                longitude: state.pickup.geo.lng,
              }}
              pinColor={"white"}
            ></Marker>
          ) : null}
        </MapView>
      ) : null}
      <HomeTopBar />
      {bottomBar()}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    zIndex: -1,
  },
});
export default Home;
