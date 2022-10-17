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
import SuggestedRoutes from "../components/SuggestedRoutes";
const Home = ({ navigation }) => {
  const { state, dispatch } = useContext(GlobalContext);
  if (!state.flags.home) return null;
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get("window");
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
    if (state.stage.display == "recommend") return <SuggestedRoutes />;
  };

  const areBothLocationsGeoChosen = () => {
    return state.dest.geo && state.pickup.geo;
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
          mapPadding={{
            top: 80,
            bottom: 250,
          }}
        >
          {state.dest.geo && (
            <Marker
              coordinate={{
                latitude: state.dest.geo.lat,
                longitude: state.dest.geo.lng,
              }}
              pinColor={"white"}
            ></Marker>
          )}
          {state.pickup.geo && (
            <Marker
              coordinate={{
                latitude: state.pickup.geo.lat,
                longitude: state.pickup.geo.lng,
              }}
              pinColor={"white"}
            ></Marker>
          )}
          {areBothLocationsGeoChosen() && (
            //TODO: remove hardcode for origin and destination so that different routes can see
            //TODO: add ability to show waypoints
            //TODO: make another check for the lat lon
            <MapViewDirections
              origin={{
                latitude: state.pickup.geo.lat,
                longitude: state.pickup.geo.lng,
              }}
              destination={{
                latitude: state.dest.geo.lat,
                longitude: state.dest.geo.lng,
              }}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor="white"
              optimizeWaypoints={true}
              onReady={(result) => {
                map.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 10,
                    bottom: height / 10,
                    left: width / 10,
                    top: height / 10,
                  },
                  animated: true,
                });
              }}
            />
          )}
        </MapView>
      ) : null}
      <HomeTopBar />
      {bottomBar()}
    </View>
  );
};

const styles = StyleSheet.create({
  //map: {
  //  width: Dimensions.get("window").width,
  //  height: Dimensions.get("window").height,
  //  position: "absolute",
  //  zIndex: -1,
  //},
});
export default Home;
