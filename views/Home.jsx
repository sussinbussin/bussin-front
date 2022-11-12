import { GOOGLE_API_KEY } from "@env";
import { View } from "native-base";
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
import { useTrackApi } from "../api/TrackApi";
import Tracker from "../components/Tracker";

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  if (!state.flags.home) return null;
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

  //listen for drive
  useEffect(() => {
    (async () => {
      const interval = setInterval(async () => {
        const { getAllTrack } = useTrackApi();
        const res = await getAllTrack();
        if (res.totalItems > 0) {
          dispatch({
            type: "SET_TRACK",
            payload: res.items[0],
          });
        } else {
          dispatch({
            type: "SET_TRACK",
            payload: null,
          });
        }
      }, 1000);

      return () => clearInterval(interval);
    })();
  }, []);
  //on changes to pickup and dest, generate markers.
  useEffect(() => {
    //for some reason the dispatch only updates here so i have to write the logic for the marker dispatch here.
    let payload = [];

    if (state.dest.geo) payload.push(state.dest.geo);
    if (state.pickup.geo) payload.push(state.pickup.geo);

    dispatch({ type: "SET_MARKERS", payload: payload });
  }, [state.pickup.geo, state.dest.geo]);

  //move camera to pick up point
  //listen to changes made by SET_CAMERA and then change accordingly.
  useEffect(() => {
    if (state.camera == null) return;

    map.current.animateCamera(
      {
        center: {
          latitude: state.camera.lat,
          longitude: state.camera.lng,
        },
      },
      { duration: 300 }
    );
  }, [state.camera]);

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
          {state.markers.map((route, index) => {
            return (
              <Marker
                coordinate={{
                  latitude: route.lat,
                  longitude: route.lng,
                }}
                key={index}
                pinColor="white"
              />
            );
          })}
          {areBothLocationsGeoChosen() && (
            <MapViewDirections
              origin={{
                latitude: state.pickup.geo.lat,
                longitude: state.pickup.geo.lng,
              }}
              destination={{
                latitude: state.dest.geo.lat,
                longitude: state.dest.geo.lng,
              }}
              waypoints={
                state.selectedRoute?.length > 2
                  ? state.selectedRoute.slice(1, -1)
                  : undefined
              }
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
      {state.tracker && <Tracker></Tracker>}
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
