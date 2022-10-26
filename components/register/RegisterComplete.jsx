import { View, Heading, Text } from "native-base";
import Lottie from "lottie-react-native";
import TopBar from "../TopBar";
import { useEffect, useRef, Animated } from "react";

const RegisterComplete = ({ navigation }) => {
  const animation = useRef();
  const heading = useRef();

  useEffect(() => {
    animation.current?.play();
  }, []);

  const handleAnimationFinish = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBar></TopBar>
      <Lottie
        ref={animation}
        source={require("../../assets/success.json")}
        loop={false}
        style={{ width: 300 }}
        speed="0.8"
        onAnimationFinish={handleAnimationFinish}
      />
      <Heading>Success!</Heading>
      <Text></Text>
    </View>
  );
};

export default RegisterComplete;
