import { Box,FlatList,Text,HStack, ScrollView, Pressable } from "native-base";
import { StyleSheet } from "react-native";
import { GlobalContext } from "../contexts/global";

import { useContext, useEffect } from "react";

const SuggestedRoutes = () => {
  const {state, dispatch} = useContext(GlobalContext);

  useEffect(() => {
    console.log(state.routes);
  }, []);
    return (<Box style={styles.box}>
        <Text bold fontSize="lg">Suggested Routes</Text>
        <ScrollView horizontal={true} style={{
          width: "100%",
        }}>
        {state.routes && state.routes.map(route => <Pressable key={route.id}>
          <Box style={{
            width: 300,
            padding: 15,
          }}>
            <Text>Car Plate: {route.carPlate}</Text>
          </Box>
        </Pressable>)}
        </ScrollView>
    </Box>)
};

const styles = StyleSheet.create({
    box: {
      width: "90%",
      padding: 15,
      marginBottom: 90,
      borderRadius: 10,
      marginTop: "auto"
    }
})
export default SuggestedRoutes;

