import { Box, Heading, Text, Button, View } from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import { GlobalContext } from "../contexts/global";
import { useContext, useEffect } from "react";
import { Carousel, Pagination } from "react-native-snap-carousel";
import { useState } from "react";
import { useDriverApi } from "../api/DriverApi";

const SuggestedRoutes = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { height, width } = Dimensions.get("screen");
  const [currentIndex, setCurrentIndex] = useState(0);

  //TODO: implement get req from driver +  skeleton
  const renderSuggestions = ({ item, index }) => {
    if (item.carModel) {
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
    if (item.route) {
      console.log("ROUTES");
      console.log(item);
      return (
        <Box style={styles.box}>
          <Heading>Public Transport</Heading>
          <Text fontSize="md">{item.cost}</Text>
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
  };
  //TODO: handle submit request
  const handleSubmit = () => {};
  useEffect(() => {
    console.log(state.routes);
  }, []);

  //fix bug swipe with whole screen
  return (
    state.routes && (
      <>
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
      </>
    )
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 15,
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 60,
  },
});
export default SuggestedRoutes;
