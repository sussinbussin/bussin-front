import { View, Heading, Button, Input } from "native-base";
import Lottie from "lottie-react-native";
import TopBar from "../TopBar";
import { useEffect, useRef, Animated } from "react";

const RegisterComplete = () => {
  const animation = useRef();
  const heading = useRef();

  useEffect(() => {
    animation.current?.play();
  }, []);

  const handleAnimationFinish = () => {};

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBar></TopBar>
      <Lottie
        ref={animation}
        source={require("../../assets/success.json")}
        loop={false}
        style={{ width: 300 }}
        onAnimationFinish={handleAnimationFinish}
      />
      <Heading>Registration Complete!</Heading>
    </View>
  );
};

export default RegisterComplete;
