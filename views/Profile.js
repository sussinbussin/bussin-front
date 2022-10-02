import {
  Alert,
  Text,
  Box,
  Button,
  Heading,
  FormControl,
  Input,
  Stack,
  Center,
  View,
} from "native-base";
import { TouchableHighlight, Image } from "react-native";
import { useContext, useState } from "react";
import TopBar from "../components/TopBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GlobalContext } from "../contexts/global";

const Profile = () => {
  const { state } = useContext(GlobalContext);
  if (!state.flags.profile) return null;
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <Box style={{ paddingTop: insets.top }}>
          <Heading>lmao</Heading>
        </Box>


        <Text>jolene</Text>

        <Button
          variant="outline"
          onPress={() => {
            console.log("edit profile");
          }}
        >
          Edit Profile
        </Button>
      </View>

      <View>
        <Text style={{ fontSize: 18 }}>My Account</Text>

        <View style={{ width: "100%" }}>
          <TouchableHighlight
            onPress={() => {
              console.log("scheduled");
            }}
          >
            <Text>Scheduled</Text>
          </TouchableHighlight>
          <View
            style={{
              height: 1,
              backgroundColor: "gray",
              marginTop: 15,
              marginBottom: 15,
            }}
          />

          <TouchableHighlight
            onPress={() => {
              console.log("saved");
            }}
          >
            <Text>Saved Places</Text>
          </TouchableHighlight>
          <View
            style={{
              height: 1,
              backgroundColor: "gray",
              marginTop: 15,
              marginBottom: 15,
            }}
          />

          <TouchableHighlight
            onPress={() => {
              console.log("emergency");
            }}
          >
            <Text>Emergency Contacts</Text>
          </TouchableHighlight>
          <View
            style={{
              height: 1,
              backgroundColor: "gray",
              marginTop: 15,
              marginBottom: 15,
            }}
          />

          <TouchableHighlight
            onPress={() => {
              console.log("payment settings");
            }}
          >
            <Text>Payment Settings</Text>
          </TouchableHighlight>
          <View
            style={{
              height: 1,
              backgroundColor: "gray",
              marginTop: 15,
              marginBottom: 15,
            }}
          />
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 18 }}>General</Text>

        <View style={{ width: "100%" }}>
          <TouchableHighlight
            onPress={() => {
              console.log("halp");
            }}
          >
            <Text>Help Centre</Text>
          </TouchableHighlight>
          <View
            style={{
              height: 1,
              backgroundColor: "gray",
              marginTop: 15,
              marginBottom: 15,
            }}
          />
          <TouchableHighlight
            onPress={() => {
              console.log("settings");
            }}
          >
            <Text>Settings</Text>
          </TouchableHighlight>
          <View
            style={{
              height: 1,
              backgroundColor: "gray",
              marginTop: 15,
              marginBottom: 15,
            }}
          />
          <TouchableHighlight
            onPress={() => {
              console.log("feedback");
            }}
          >
            <Text>Feedback</Text>
          </TouchableHighlight>
          <View
            style={{
              height: 1,
              backgroundColor: "gray",
              marginTop: 15,
              marginBottom: 15,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;
