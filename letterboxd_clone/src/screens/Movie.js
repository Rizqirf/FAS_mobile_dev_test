import { FlatList, Heading, HStack, ScrollView } from "native-base";
import { useEffect } from "react";
import { View, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { fetchTopMovie } from "../stores/actions";

export default function Movie({ navigation }) {
  const { topMovies, load } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopMovie());
  }, []);
  return (
    // <SafeAreaProvider style={{ backgroundColor: "red" }}>
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "blue",
      }}
    >
      <ScrollView>
        <View>
          <Heading pt={5} pl={2} pb={2}>
            Top Rated
          </Heading>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack justifyContent="center" paddingX={0.5}>
              {topMovies.length > 1 &&
                topMovies.map((el) => <MovieCard data={el} key={el.id} />)}
            </HStack>
          </ScrollView>
        </View>
        <View>
          <Heading pt={5} pl={2} pb={2}>
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
          {/* <FlatList
              style={{ flex: 0 }}
              initialNumToRender={15}
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
              numColumns={3}
              renderItem={({ item }) => <MovieCard item={item} />}
              keyExtractor={(item) => item}
              // marginLeft={2}
              contentContainerStyle={{ alignItems: "center" }}
              backgroundColor="rose.800"
              scrollEnabled={false}
            /> */}
        </View>
      </ScrollView>
    </View>
    // </SafeAreaProvider>
  );
}
