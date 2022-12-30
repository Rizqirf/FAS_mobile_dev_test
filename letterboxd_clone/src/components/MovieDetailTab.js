// import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Divider,
  FlatList,
  Heading,
  HStack,
  ScrollView,
} from "native-base";
import { useState } from "react";
import {
  View,
  useWindowDimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

function FirstRoute({ cast, crew }) {
  const navigation = useNavigation();
  const renderCast = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ArtistDetail", { id: item.id })}
    >
      <Box key={item.id} width="24">
        <Avatar
          bg="cyan.500"
          alignSelf="center"
          size="lg"
          source={
            item.profile_path
              ? {
                  uri: `https://image.tmdb.org/t/p/w200${item.profile_path}`,
                }
              : ""
          }
        >
          {item.name.split(" ")[0].substring(0, 1)}
        </Avatar>
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#8d9cab",
            marginTop: 5,
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 10,
            fontWeight: "700",
            color: "#8d9cab",
          }}
        >
          {item.character}
        </Text>
      </Box>
    </TouchableOpacity>
  );
  const renderCrew = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ArtistDetail", { id: item.id })}
    >
      <Box key={item.id} width="24">
        <Avatar
          bg="cyan.500"
          alignSelf="center"
          size="lg"
          source={
            item.profile_path
              ? {
                  uri: `https://image.tmdb.org/t/p/w200${item.profile_path}`,
                }
              : ""
          }
        >
          {item.name.split(" ")[0].substring(0, 1)}
        </Avatar>
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#8d9cab",
            marginTop: 5,
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 10,
            fontWeight: "700",
            color: "#8d9cab",
          }}
        >
          {item.job}
        </Text>
      </Box>
    </TouchableOpacity>
  );
  return (
    <>
      <Heading color={"#8d9cab"} marginLeft="2" marginTop="3" size="md">
        Cast
      </Heading>
      {cast && (
        <FlatList
          _contentContainerStyle={{
            marginTop: 3,
            borderBottomColor: "#000000",
            borderBottomWidth: "10px",
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          initialNumToRender={6}
          data={[
            ...new Map(cast.map((item) => [item["character"], item])).values(),
          ]}
          renderItem={renderCast}
        />
      )}
      <Divider bg="#2C343F" />
      <Heading color={"#8d9cab"} marginLeft="2" marginTop="3" size="md">
        crew
      </Heading>
      {crew && (
        <FlatList
          contentContainerStyle={{ marginTop: 10 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          initialNumToRender={6}
          data={[...new Map(crew.map((item) => [item["name"], item])).values()]}
          renderItem={renderCrew}
        />
      )}
      <Divider bg="#2C343F" />
    </>
  );
}
function SecondRoute({ production_companies, production_countries, titles }) {
  return (
    <View style={{ flex: 1 }}>
      <Box>
        <Text>Studios</Text>
        {production_companies &&
          production_companies.map((el) => <Text key={el.id}>{el.name}</Text>)}
      </Box>
      <Box>
        <Text>Countries</Text>
        {production_countries &&
          production_countries.map((el, i) => <Text key={i}>{el.name}</Text>)}
      </Box>
      <Box>
        <Text>Alternative Titles</Text>
        {titles &&
          titles.map((el, i) => (
            <Text style={{ textAlign: "left" }} key={i}>
              {el.title}
            </Text>
          ))}
      </Box>
    </View>
  );
}
function ThirdRoute({ genres }) {
  return (
    <View style={{ flex: 1 }}>
      <Box>
        <Text>Genres</Text>
        {genres && genres.map((el) => <Text key={el.id}>{el.name}</Text>)}
      </Box>
    </View>
  );
}
function DummyRoute() {
  return <View style={{ flex: 1, backgroundColor: "#673ab7" }} />;
}

const renderScene = SceneMap({
  castCrew: DummyRoute,
  details: DummyRoute,
  genre: DummyRoute,
});
function renderTabBar(props) {
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#00e054" }}
      indicatorContainerStyle={{
        borderBottomColor: "#2C343F",
        borderBottomWidth: 1,
      }}
      labelStyle={{ color: "#f2f2f3" }}
      style={{ backgroundColor: "#181b20" }}
    />
  );
}

export default function MovieDetailTab({ movieDetail }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "castCrew", title: "Cast + Crew" },
    { key: "details", title: "Details" },
    { key: "genre", title: "Genres" },
  ]);
  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <View style={{ flex: 1 }}>
        {index === 0 && (
          <FirstRoute
            cast={movieDetail.credits.cast}
            crew={movieDetail.credits.crew}
          />
        )}
        {index === 1 && (
          <SecondRoute
            production_companies={movieDetail.production_companies}
            production_countries={movieDetail.production_countries}
            titles={movieDetail.alternative_titles.titles}
          />
        )}
        {index === 2 && <ThirdRoute genres={movieDetail.genres} />}
      </View>
    </View>
  );
}
