import { createStackNavigator } from "@react-navigation/stack";
import ArtistDetail from "../screens/ArtistDetail";
import MovieDetail from "../screens/MovieDetail";
import TabNavigator from "./TabNavigators";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "tomato" },
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{
          title: "Movies",
        }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{
          title: "My profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ArtistDetail"
        component={ArtistDetail}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
