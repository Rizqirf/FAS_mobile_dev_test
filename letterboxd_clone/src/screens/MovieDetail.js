import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  ScrollView,
} from "native-base";
import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  ImageBackground,
  Linking,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image as image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchMovieDetail } from "../stores/actions";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import MovieDetailTab from "../components/MovieDetailTab";
import MovieCard from "../components/MovieCard";
import RatingModal from "../components/RatingModal";
import loading from "../../assets/loading.gif";

export default function MovieDetail({ route }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loadingGIF = image.resolveAssetSource(loading).uri;

  const [isCollapse, setCollapse] = useState(true);
  const [load, setLoad] = useState(true);
  const [isOpenRating, setOpenRating] = useState(false);
  const [rating, setRating] = useState(0);

  const { movieDetail } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchMovieDetail(id)).then((_) => setLoad(false));
  }, []);

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
    <View style={{ backgroundColor: "#181b20" }}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
        <Box>
          <AspectRatio w="100%" ratio={16 / 8}>
            <ImageBackground
              source={{
                uri: `https://image.tmdb.org/t/p/w500${
                  movieDetail.images.backdrops[
                    Math.floor(
                      Math.random() * movieDetail.images.backdrops.length
                    )
                  ].file_path
                }`,
              }}
              alt="image"
            >
              <LinearGradient
                colors={["#00000000", "#181b20"]}
                style={{
                  height: "40%",
                  width: "100%",
                  position: "absolute",
                  marginTop: "30%",
                }}
              />
            </ImageBackground>
          </AspectRatio>
          <Center position="absolute" top={12} left={4}>
            <Ionicons
              name={"arrow-back"}
              color={"#f2f2f3"}
              size={40}
              onPress={() => navigation.navigate("Home")}
            />
          </Center>
        </Box>
        <Box px="2">
          <Box flexDirection={"row"} justifyContent="space-between" mt="3">
            <Box width={"68%"}>
              <Heading color={"#f2f2f3"}>{movieDetail.original_title}</Heading>
              <Box flexDirection={"row"} mt="3">
                <Box width={"60%"}>
                  <Text style={{ color: "#8d9cab", fontSize: 16 }}>
                    Directed By
                  </Text>
                  <Text
                    style={{
                      color: "#8d9cab",
                      fontWeight: "700",
                      fontSize: 16,
                    }}
                  >
                    {
                      movieDetail.credits.crew.find(
                        (el) => el.job === "Director"
                      ).name
                    }
                  </Text>
                  <Box flexDirection={"row"} alignItems={"center"} mt="3">
                    <Text style={{ color: "#8d9cab", fontSize: 16 }}>
                      {movieDetail.release_date.split("-")[0]}{" "}
                    </Text>
                    <Ionicons name="ellipse" size={6} color="#8d9cab" />
                    <Text style={{ color: "#8d9cab", fontSize: 16 }}>
                      {" "}
                      {movieDetail.runtime} mins
                    </Text>
                  </Box>
                </Box>
                <Box width={"40%"}>
                  <Text
                    style={{
                      alignSelf: "center",
                      position: "absolute",
                      bottom: 0,
                      color: "#f2f2f3",
                    }}
                  >
                    Trailer
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box width={"28%"}>
              <AspectRatio w={"100%"} ratio={2 / 3}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
                  }}
                  alt="image"
                  resizeMode="contain"
                />
              </AspectRatio>
            </Box>
          </Box>
          <Box mt="3" mb="2">
            <Text style={{ color: "#8d9cab", marginBottom: 8 }}>
              {movieDetail.tagline}
            </Text>
            {isCollapse && (
              <Pressable onPress={() => setCollapse(false)}>
                <Text
                  numberOfLines={3}
                  ellipsizeMode="tail"
                  style={{ color: "#8d9cab" }}
                >
                  {movieDetail.overview}
                </Text>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={20}
                  color={"#8d9cab"}
                  style={{ alignSelf: "center" }}
                />
              </Pressable>
            )}
            {!isCollapse && (
              <Pressable onPress={() => setCollapse(true)}>
                <Text style={{ color: "#8d9cab" }}>{movieDetail.overview}</Text>
              </Pressable>
            )}
          </Box>
        </Box>
        <Divider bg="#2C343F" />
        <Box flexDirection={"row"} style={{ alignItems: "center" }} my="3">
          <Box w={"20"} style={{ flex: 1 }}>
            <Ionicons
              name="star"
              size={24}
              color={"yellow"}
              style={{ alignSelf: "center" }}
            />
            <Text
              style={{ alignSelf: "center", fontSize: 12, color: "#8d9cab" }}
            >
              {Math.round((movieDetail.vote_average + Number.EPSILON) * 100) /
                100}
              /10
            </Text>
            <Text
              style={{ alignSelf: "center", fontSize: 10, color: "#8d9cab" }}
            >
              {movieDetail.vote_count}
            </Text>
          </Box>
          <Box w={"20"} style={{ flex: 1 }}>
            <RatingModal name={movieDetail.original_title} />
          </Box>
          <Box w={"20"} style={{ flex: 1 }}>
            <Text
              style={{ alignSelf: "center", color: "#8d9cab", fontSize: 14 }}
            >
              Critic Reviews
            </Text>
          </Box>
        </Box>
        <Divider bg="#2C343F" />
        <MovieDetailTab movieDetail={movieDetail} />
        <Box px="2" mt="3">
          <Heading size={"md"} color={"#8d9cab"}>
            Get Similar Movies
          </Heading>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack justifyContent="center" pt={2}>
              {movieDetail.similar.results.map((el) => (
                <MovieCard data={el} key={el.id} />
              ))}
            </HStack>
          </ScrollView>
        </Box>
        <Divider bg="#2C343F" />
        <Box px="2" pt={3}>
          <Heading size={"md"} color={"#8d9cab"}>
            More about "{movieDetail.original_title}"
          </Heading>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                `https://www.imdb.com/title/${movieDetail.imdb_id}`
              ).catch((err) => console.error("Couldn't load page", err));
            }}
          >
            <Box flexDirection={"row"} justifyContent="space-between" my={3}>
              <Text style={{ color: "#8d9cab" }}>View on Imdb</Text>
              <Ionicons name="arrow-redo" size={16} color={"#8d9cab"} />
            </Box>
          </TouchableOpacity>
          <Divider bg="#2C343F" />
        </Box>
      </ScrollView>
    </View>
  );
}
