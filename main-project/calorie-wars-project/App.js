import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider as PaperProvider } from "react-native-paper";
import ScanBarcode from "./Components/ScanBarcode";

import Login from "./Screens/Login";
import Home from "./Screens/Home";
import ProfilePage from "./Screens/ProfilePage";
import ScanBarcode from "./Components/ScanBarcode";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
