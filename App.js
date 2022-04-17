import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNav from "./src/navigators/AppStack.nav";

export default function App() {
  return (
    <NavigationContainer>
      <AppStackNav />
    </NavigationContainer>
  );
}
