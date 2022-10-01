import { Heading, View, Box, HStack, Center, Input } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { FlagContext } from "../flags";
import MapView from "react-native-maps";
import Marker from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { mapStyle } from "../theming/mapStyle";
import LocationSearch from "../components/LocationSearch";

const Home = () => {
  const flag = useContext(FlagContext);
  if (!flag.home) return null;
  const insets = useSafeAreaInsets();

  const [location, setLocation] = useState();

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
      console.log(location);
      setLocation(location.coords);
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
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
        ></MapView>
      ) : null}
      <Heading style={{ marginTop: insets.top + 15, marginBottom: 30 }}>
        Bussin
      </Heading>
      <LocationSearch style={styles.search} />
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
