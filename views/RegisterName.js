import { Heading, View, Box, HStack, Center } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext } from "react";
import { FlagContext } from "../contexts/flags";
const RegisterName = () => {
  // for stuff like username, email, name, dob etc.

  const flag = useContext(FlagContext);
  if (!flag.registerName) return null;
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Box style={{ paddingTop: insets.top }}>
        <Heading>lmao</Heading>
      </Box>
    </View>
  );
};

export default RegisterName;
