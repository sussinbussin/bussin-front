import { Heading, View, Box, HStack, Center, Input } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { FlagContext } from "../flags";
import MapView from "react-native-maps";
import Marker from "react-native-maps";

import * as Location from "expo-location";

const Home = () => {
  const flag = useContext(FlagContext);
  if (!flag.home) return null;
  const insets = useSafeAreaInsets();

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Heading style={{ marginTop: insets.top + 15, marginBottom: 30 }}>
        Bussin
      </Heading>
      <Box w="90%" style={{ padding: 10, borderRadius: 10, paddingBottom: 30 }}>
        Where to?
        <Input type="text" placeholder="Starting Location"></Input>
      </Box>
      <MapView style={styles.map} mapType="mutedStandard"></MapView>
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
