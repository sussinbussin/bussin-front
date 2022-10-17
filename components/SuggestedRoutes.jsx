import { Box, Heading, Text, Button } from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import { GlobalContext } from "../contexts/global";
import { useContext, useEffect } from "react";
import { Carousel, Pagination } from "react-native-snap-carousel";
import {useState} from 'react';
import { useDriverApi } from "../api/DriverApi";

const SuggestedRoutes = () => {
  const {state, dispatch} = useContext(GlobalContext);
  const {height, width} = Dimensions.get("screen");
  const { getDriver } = useDriverApi();
  const [currentIndex, setCurrentIndex] = useState(0);

  //TODO: implement get req from driver +  skeleton
  const renderSuggestions = ({item, index}) => {
    
    return <Box style={styles.box}>
      <Heading>{item.carPlate}</Heading>
      <Text fontSize="md">Capacity: {item.capacity}</Text>
      <Button variant="outline" onPress={handleSubmit}>Book</Button>
    </Box>
  }

  //TODO: handle change map view
  const handleSnap = (index) => {
    console.log(index);
  }
  //TODO: handle submit request
  const handleSubmit = () => {
    
  }
  useEffect(() => {
    console.log(state.routes);
  }, []);
    return (state.routes && <>
    <Carousel
      style={styles.carousel} 
      data={state.routes}
      renderItem={renderSuggestions}
      sliderWidth={width}
      itemWidth={width * 0.80}
      onSnapToItem={handleSnap}
      layout="default"
    />

    </>
   )
};

const styles = StyleSheet.create({
    box: {
      padding: 15,
      marginBottom: 60,
      borderRadius: 10,
      marginTop: "auto"
    },
})
export default SuggestedRoutes;

