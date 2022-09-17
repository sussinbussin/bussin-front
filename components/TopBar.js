import { View, Box, Center, Heading } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
/**
 * The bar on top of the application, together with the status bar.
 */
const TopBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: 10 }}>
      <Center>
        <Heading>Bussin.</Heading>
      </Center>
    </View>
  );
};

export default TopBar;
