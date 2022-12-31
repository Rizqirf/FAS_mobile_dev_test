import {
  Center,
  FlatList,
  Heading,
  HStack,
  Icon,
  Input,
  ScrollView,
  Spinner,
  StatusBar,
} from "native-base";
import { useEffect, useState } from "react";
import { View, Pressable, Text, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../stores/actions";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { MOVIEDB_KEY } from "@env";
import loading from "../../assets/loading.gif";

export default function Movie({ navigation }) {
  const { topMovies, upcomingMovies, popMovies, nowMovies } = useSelector(
    (state) => state
  );
  const [load, setLoad] = useState(true);
  const [query, setQuery] = useState("");
  const [searchResult, setResult] = useState([]);
  const dispatch = useDispatch();

  const loadingGIF = Image.resolveAssetSource(loading).uri;

  useEffect(() => {
    dispatch(fetchMovies()).then((_) => setLoad(false));
  }, []);

  useEffect(() => {
    if (query) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        )
        .then(({ data }) => setResult(data.results))
        .catch((err) => console.log(err));
    } else {
      setResult([]);
    }
  }, [query]);

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
    <View
      style={{
        flex: 1,
        backgroundColor: "#181b20",
      }}
    >
      <StatusBar backgroundColor={"#445565"} />
      <SafeAreaView>
        <ScrollView>
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
          {searchResult.length > 1 && (
            <>
              <Heading pt={5} pl={2} pb={2} color="#f2f2f3">
                Search results
              </Heading>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {searchResult.length > 1 &&
                  searchResult.map((el) => <MovieCard data={el} key={el.id} />)}
              </View>
            </>
          )}
          {searchResult.length === 0 && (
            <View>
              <View>
                <Heading pt={5} pl={2} pb={2} color="#f2f2f3">
                  Now Playing
                </Heading>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <HStack justifyContent="center" paddingX={0.5}>
                    {nowMovies.length > 1 &&
                      nowMovies.map((el) => (
                        <MovieCard data={el} key={el.id} />
                      ))}
                  </HStack>
                </ScrollView>
              </View>
              <View>
                <Heading pt={5} pl={2} pb={2} color="#f2f2f3">
                  Top Rated
                </Heading>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <HStack justifyContent="center" paddingX={0.5}>
                    {topMovies.length > 1 &&
                      topMovies.map((el) => (
                        <MovieCard data={el} key={el.id} />
                      ))}
                  </HStack>
                </ScrollView>
              </View>
              <View>
                <Heading pt={5} pl={2} pb={2} color="#f2f2f3">
                  Upcoming
                </Heading>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <HStack justifyContent="center" paddingX={0.5}>
                    {upcomingMovies.length > 1 &&
                      upcomingMovies.map((el) => (
                        <MovieCard data={el} key={el.id} />
                      ))}
                  </HStack>
                </ScrollView>
              </View>
              <View>
                <Heading pt={5} pl={2} pb={2} color="#f2f2f3">
                  Popular
                </Heading>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <HStack justifyContent="center" paddingX={0.5}>
                    {popMovies.length > 1 &&
                      popMovies.map((el) => (
                        <MovieCard data={el} key={el.id} />
                      ))}
                  </HStack>
                </ScrollView>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
