import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Heading,
  Image,
  ScrollView,
} from "native-base";
import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  ImageBackground,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchMovieDetail } from "../stores/actions";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import MovieDetailTab from "../components/MovieDetailTab";

export default function MovieDetail({ route }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isCollapse, setCollapse] = useState(true);
  const [load, setLoad] = useState(true);
  const [isLiked, setLike] = useState(false);

  const { movieDetail } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchMovieDetail(id)).then((_) => setLoad(false));
  }, []);

  if (load) return <Text>{id}</Text>;

  return (
    <View>
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
                colors={["#00000000", "#fff"]}
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
              color={"white"}
              size={40}
              onPress={() => navigation.navigate("Home")}
            />
          </Center>
        </Box>
        <View style={{ paddingHorizontal: 5 }}>
          <Box flexDirection={"row"} justifyContent="space-between">
            <Box width={"68%"}>
              <Heading>{movieDetail.original_title}</Heading>
              <Box flexDirection={"row"}>
                <Box width={"60%"}>
                  <Text>Directed By</Text>
                  <Text>
                    {
                      movieDetail.credits.crew.find(
                        (el) => el.job === "Director"
                      ).name
                    }
                  </Text>
                  <Box flexDirection={"row"} alignItems={"center"}>
                    <Text>{movieDetail.release_date.split("-")[0]} </Text>
                    <Ionicons name="ellipse" size={6} />
                    <Text> {movieDetail.runtime} mins</Text>
                  </Box>
                </Box>
                <Box width={"40%"}>
                  <Text
                    style={{
                      alignSelf: "center",
                      position: "absolute",
                      bottom: 0,
                    }}
                  >
                    Trailer
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box width={"28%"}>
              <AspectRatio w={"100%"} ratio={9 / 16}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
                  }}
                  alt="image"
                />
              </AspectRatio>
            </Box>
          </Box>
          <Box>
            <Text>{movieDetail.tagline}</Text>
            {isCollapse && (
              <Pressable onPress={() => setCollapse(false)}>
                <Text numberOfLines={3} ellipsizeMode="tail">
                  {movieDetail.overview}
                </Text>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={20}
                  color={"dark"}
                  style={{ alignSelf: "center" }}
                />
              </Pressable>
            )}
            {!isCollapse && (
              <Pressable onPress={() => setCollapse(true)}>
                <Text>{movieDetail.overview}</Text>
              </Pressable>
            )}
          </Box>
          <Divider />
        </View>
        <Box
          flexDirection={"row"}
          style={{ alignItems: "center", marginVertical: 10 }}
        >
          <Box w={"20"} style={{ flex: 1 }}>
            <Ionicons
              name="star"
              size={24}
              color={"yellow"}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ alignSelf: "center", fontSize: 12 }}>
              {Math.round((movieDetail.vote_average + Number.EPSILON) * 100) /
                100}
              /10
            </Text>
            <Text style={{ alignSelf: "center", fontSize: 10 }}>
              {movieDetail.vote_count}
            </Text>
          </Box>
          <Box w={"20"} style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => setLike(true)}>
              <Ionicons
                name={isLiked ? "star" : "star-outline"}
                size={24}
                color={"blue"}
                style={{ alignSelf: "center" }}
              />
              <Text style={{ alignSelf: "center", fontSize: 14 }}>
                Rate this
              </Text>
            </TouchableOpacity>
          </Box>
          <Box w={"20"} style={{ flex: 1 }}>
            <Text style={{ alignSelf: "center" }}>Critic Reviews</Text>
          </Box>
        </Box>
        <Divider />
        <MovieDetailTab movieDetail={movieDetail} />
        <View style={{ paddingHorizontal: 5 }}>
          <Heading size={"md"}>
            More about "{movieDetail.original_title}"
          </Heading>
          <TouchableOpacity>
            <Box flexDirection={"row"} justifyContent="space-between">
              <Text>View on Imdb</Text>
              <Ionicons name="arrow-redo" size={16} />
            </Box>
          </TouchableOpacity>
          <Divider />
        </View>
      </ScrollView>
    </View>
  );
}
