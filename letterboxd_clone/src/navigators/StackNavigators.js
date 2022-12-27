import { createStackNavigator } from "@react-navigation/stack";
import ArtistList from "../screens/ArtistList";
import MovieList from "../screens/MovieList";
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
        name="MovieList"
        component={MovieList}
        options={{
          title: "My profile",
        }}
      />
      <Stack.Screen
        name="ArtistList"
        component={ArtistList}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
