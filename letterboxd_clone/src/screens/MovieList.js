import { Text, View } from "react-native";

export default function MovieList({ route }) {
  const { name } = route.params;
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}
