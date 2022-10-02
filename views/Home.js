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
import MapView from "react-native-maps";
import Marker from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { mapStyle } from "../theming/mapStyle";
import LocationSearch from "../components/LocationSearch";
import HomeTopBar from "../components/HomeTopBar";
import PickupSearch from "../components/PickupSearch";

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

  const bottomBar = () => {
    if (state.stage.display == "search")
      return <LocationSearch style={styles.search} />;
    if (state.stage.display == "pickup") return <PickupSearch />;
  };

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
          style={styles.map}
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
          ref={map}
        ></MapView>
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
    zIndex: -99,
  },
});
export default Home;
