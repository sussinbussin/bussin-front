import { Heading, View, Text, Input, Stack, Button } from "native-base";
import TopBar from "../TopBar";

const RegisterPassword = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate("RegisterComplete");
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TopBar></TopBar>
      <Heading
        style={{
          alignSelf: "flex-start",
          paddingLeft: 30,
          paddingTop: 20,
        }}
        size="2xl"
      >
        Final stretch!
      </Heading>
      <Text
        style={{
          alignSelf: "flex-start",
          paddingLeft: 30,
        }}
      >
        Please fill in your password.
      </Text>
      <Stack
        style={{
          paddingVertical: 30,
        }}
        w="85%"
      >
        <Input
          style={{
            paddingTop: 20,
          }}
          variant="underlined"
          type="password"
          size="lg"
          placeholder="Password"
        />
        <Input
          style={{
            paddingTop: 20,
          }}
          variant="underlined"
          type="password"
          size="lg"
          placeholder="Confirm Password"
        />
        <Button
          variant="outline"
          style={{ marginTop: 30 }}
          onPress={handleNext}
        >
          Complete
        </Button>
      </Stack>
    </View>
  );
};

export default RegisterPassword;
