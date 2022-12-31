import {
  Avatar,
  Center,
  Heading,
  HStack,
  Icon,
  Input,
  ScrollView,
  Spinner,
} from "native-base";
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
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { MOVIEDB_KEY } from "@env";
import loading from "../../assets/loading.gif";

const windowWidth = Dimensions.get("window").width;

export default function Artist({ navigation }) {
  const { popularPeople } = useSelector((state) => state);
  const [load, setLoad] = useState(true);
  const [query, setQuery] = useState("");
  const [searchResult, setResult] = useState([]);
  const dispatch = useDispatch();
  const loadingGIF = Image.resolveAssetSource(loading).uri;

  useEffect(() => {
    dispatch(fetchPopularPeople()).then((_) => setLoad(false));
  }, []);
  useEffect(() => {
    if (query) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/person?api_key=${MOVIEDB_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        )
        .then(({ data }) => setResult(data.results))
        .catch((err) => console.log(err));
    } else {
      setResult([]);
    }
  }, [query]);

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

  if (load)
    return (
      <Center
        style={{
          flex: 1,
          backgroundColor: "#181b20",
        }}
      >
        <Image
          source={{ uri: loadingGIF }}
          style={{ height: "100%", width: "80%" }}
          resizeMode="contain"
          alt="loading"
        />
      </Center>
    );

  return (
    <View style={styles.container}>
      <Center>
        <Input
          placeholder="Search Movies"
          width="90%"
          variant={"filled"}
          borderRadius="20"
          mt={3}
          py="1"
          px="2"
          fontSize="14"
          color={"#181b20"}
          backgroundColor={"#f2f2f3"}
          value={query}
          onChangeText={(text) => setQuery(text)}
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<Ionicons name="search" />}
            />
          }
          InputRightElement={
            <Icon
              m="2"
              mr="3"
              size="6"
              color="gray.400"
              as={<Ionicons name="close" />}
              onPress={() => {
                setQuery("");
                setResult([]);
              }}
            />
          }
        />
      </Center>
      <Text style={styles.title}>
        {searchResult.length === 0 ? "Popular People" : "Search Result"}
      </Text>
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={searchResult.length === 0 ? popularPeople : searchResult}
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
