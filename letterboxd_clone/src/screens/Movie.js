import { FlatList, Heading, HStack, ScrollView, StatusBar } from "native-base";
import { useEffect, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { fetchTopMovie } from "../stores/actions";

export default function Movie({ navigation }) {
  const { topMovies } = useSelector((state) => state);
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopMovie()).then((_) => setLoad(false));
  }, []);

  if (load) return <Text>Loading...</Text>;

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
                  topMovies.map((el) => <MovieCard data={el} key={el.id} />)}
              </HStack>
            </ScrollView>
          </View>
          <View>
            <Heading pt={5} pl={2} pb={2} color="#f2f2f3">
              Top Rated
            </Heading>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {topMovies.length > 1 &&
                topMovies.map((el) => <MovieCard data={el} key={el.id} />)}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
