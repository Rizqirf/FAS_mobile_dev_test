import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  Pressable,
  Button,
} from "react-native";

export default function Artist({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable onPress={() => navigation.navigate("ArtistDetail")}>
        <Text>Artist!</Text>
      </Pressable>
    </View>
  );
}
