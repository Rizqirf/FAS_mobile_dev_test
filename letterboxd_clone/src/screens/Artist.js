import { Avatar, Heading, HStack, ScrollView } from "native-base";
import {
  FlatList,
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularPeople } from "../stores/actions";

const windowWidth = Dimensions.get("window").width;

export default function Artist({ navigation }) {
  const { popularPeople } = useSelector((state) => state);
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularPeople()).then((_) => setLoad(false));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ArtistDetail", {
              id: item.id,
            });
          }}
        >
          <Avatar
            bg="#f2f2f3"
            alignSelf="center"
            size="2xl"
            source={
              item.profile_path
                ? {
                    uri: `https://image.tmdb.org/t/p/w470_and_h470_face${item.profile_path}`,
                  }
                : ""
            }
          >
            {item.name.split(" ")[0].substring(0, 1)}
          </Avatar>
          <View style={styles.contentContainer}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  if (load) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular People</Text>
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={popularPeople}
          renderItem={renderItem}
          keyExtractor={(el, i) => i}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#181b20",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 28,
    marginVertical: 10,
    fontWeight: "700",
    color: "#f2f2f3",
    padding: 4,
    marginLeft: 10,
  },
  cardContainer: {
    margin: 10,
    width: windowWidth / 2 - 20,
  },

  contentContainer: {
    padding: 14,
  },
  name: {
    fontSize: 16,
    marginBottom: 2,
    fontWeight: "700",
    color: "#f2f2f3",
    textAlign: "center",
  },
});
