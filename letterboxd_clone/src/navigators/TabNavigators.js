import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Center } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

import Artist from "../screens/Artist";
import Movie from "../screens/Movie";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Movie") {
            iconName = focused ? "videocam" : "videocam-outline";
          } else if (route.name === "Artist") {
            iconName = focused ? "people" : "people-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerTitleAlign: "Center",
        headerShown: true,
        headerTintColor: "#f2f2f3",
        headerStyle: { backgroundColor: "#445565" },
        tabBarActiveTintColor: "#00B021",
        tabBarInactiveTintColor: "#f2f2f3",
        tabBarActiveBackgroundColor: "#445565",
        tabBarInactiveBackgroundColor: "#445565",
      })}
    >
      <Tab.Screen name="Movie" component={Movie} />
      <Tab.Screen name="Artist" component={Artist} />
    </Tab.Navigator>
  );
}
