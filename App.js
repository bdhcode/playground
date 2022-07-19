import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNav from "./src/navigators/AppStack.nav";
import ContextProviders from "./src/contexts/ContextProviders";

export default function App() {
  return (
    <NavigationContainer>
      <ContextProviders>
        <AppStackNav />
      </ContextProviders>
    </NavigationContainer>
  );
}
