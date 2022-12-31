import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStac,
} from "native-base";
import { Platform } from "react-native";
import "react-native-gesture-handler";
import StackNavigator from "./src/navigators/StackNavigators";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/stores";

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: "#181b20" }}>
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
