import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterName from "../components/register/RegisterName";
import RegisterDetails from "../components/register/RegisterDetails";
import RegisterPassword from "../components/register/RegisterPassword";
import RegisterComplete from "../components/register/RegisterComplete";
import { initialState, RegisterContext } from "../contexts/register";

const RegisterNew = () => {
  const Stack = createNativeStackNavigator();

  return (
    <RegisterContext.Provider value={initialState}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="RegisterName" component={RegisterName} />
        <Stack.Screen name="RegisterDetails" component={RegisterDetails} />
        <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
        <Stack.Screen name="RegisterComplete" component={RegisterComplete} />
      </Stack.Navigator>
    </RegisterContext.Provider>
  );
};

export default RegisterNew;
