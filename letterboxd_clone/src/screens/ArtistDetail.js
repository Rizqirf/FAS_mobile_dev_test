import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonDetail } from "../stores/actions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AspectRatio, Box, Center } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ArtistDetail({ route, navigation }) {
  const { personDetail } = useSelector((state) => state);
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();
  const { id } = route.params;

  useEffect(() => {
    dispatch(fetchPersonDetail(id)).then((_) => setLoad(false));
  }, []);

  function formatedDate(date) {
    const event = new Date(personDetail.birthday);
    return event.toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginRight: 10, marginVertical: 4 }}>
        <AspectRatio ratio={2 / 3} w="24">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.file_path}`,
            }}
            style={{ borderRadius: 10 }}
          />
        </AspectRatio>
      </View>
    );
  };

  if (load) return <Text>Loading...</Text>;

  return (
    <View>
      <ScrollView style={{ backgroundColor: "#181b20" }}>
        <StatusBar translucent backgroundColor="transparent" />
        <Box>
          <AspectRatio w="100%" ratio={16 / 8}>
            <ImageBackground
              source={{
                uri: `https://image.tmdb.org/t/p/w500${
                  personDetail.images.profiles[
                    Math.floor(
                      Math.random() * personDetail.images.profiles.length
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
              onPress={() => navigation.navigate("Artist")}
            />
          </Center>
        </Box>
        <Box m="2" flexDirection={"row"}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w470_and_h470_face${personDetail.profile_path}`,
            }}
            style={{
              height: 120,
              width: 120,
              borderRadius: 120 / 2,
              borderColor: "#f2f2f3",
              borderWidth: 1,
            }}
          />
          <Box ml="3" w="64">
            <Text
              style={{
                color: "#f2f2f3",
                fontSize: 30,
                fontWeight: "700",
                marginBottom: 2,
              }}
            >
              {personDetail.name}
            </Text>
            <Text style={{ color: "#f2f2f3", fontSize: 18 }}>
              {personDetail.also_known_as[0]}
            </Text>
          </Box>
        </Box>
        <Box m="2">
          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                color: "#8d9cab",
                fontSize: 16,
                fontWeight: "700",
                letterSpacing: 0.8,
              }}
            >
              BIOGRAPHY
            </Text>
            <View
              style={{
                marginVertical: 8,
                borderBottomColor: "#8d9cab",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text
              style={{
                color: "#f2f2f3",
                fontSize: 14,
                textAlign: "justify",
                letterSpacing: 0.8,
              }}
            >
              {personDetail.biography}
            </Text>
          </View>

          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                color: "#8d9cab",
                fontSize: 16,
                fontWeight: "700",
                letterSpacing: 0.8,
              }}
            >
              IMAGES
            </Text>
            <View
              style={{
                marginVertical: 8,
                borderBottomColor: "#99AABB",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <FlatList
              horizontal
              showHorizontalScrollIndicator={false}
              renderItem={renderItem}
              data={personDetail.images.profiles.slice(0, 10)}
              keyExtractor={(item) => item.id}
            />
          </View>

          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                color: "#99AABB",
                fontSize: 16,
                fontWeight: "700",
                letterSpacing: 0.8,
              }}
            >
              PERSONAL DETAILS
            </Text>
            <View
              style={{
                marginVertical: 8,
                borderBottomColor: "#99AABB",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text
              style={{
                color: "#f2f2f3",
                fontSize: 14,
                textAlign: "justify",
                letterSpacing: 0.8,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              Date of Birth
            </Text>
            <Text
              style={{
                color: "#f2f2f3",
                fontSize: 14,
                textAlign: "justify",
                letterSpacing: 0.8,
              }}
            >
              {formatedDate(personDetail.birthday)}
            </Text>
            {personDetail.deathday && (
              <>
                <Text
                  style={{
                    color: "#f2f2f3",
                    fontSize: 14,
                    textAlign: "justify",
                    letterSpacing: 0.8,
                    fontWeight: "500",
                    marginTop: 10,
                  }}
                >
                  Date of Death
                </Text>
                <Text
                  style={{
                    color: "#f2f2f3",
                    fontSize: 14,
                    textAlign: "justify",
                    letterSpacing: 0.8,
                  }}
                >
                  {formatedDate(personDetail.deathday)}
                </Text>
              </>
            )}
            {personDetail.place_of_birth && (
              <>
                <Text
                  style={{
                    color: "#f2f2f3",
                    fontSize: 14,
                    textAlign: "justify",
                    letterSpacing: 0.8,
                    fontWeight: "500",
                    marginTop: 10,
                  }}
                >
                  Place of Birth
                </Text>
                <Text style={{ color: "#f2f2f3" }}>
                  {personDetail.place_of_birth}
                </Text>
              </>
            )}
            <Text
              style={{
                color: "#f2f2f3",
                fontSize: 14,
                textAlign: "justify",
                letterSpacing: 0.8,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              Known for department
            </Text>
            <Text style={{ color: "#f2f2f3" }}>
              {personDetail.known_for_department}
            </Text>
            {personDetail.also_known_as.length > 0 && (
              <>
                <Text
                  style={{
                    color: "#f2f2f3",
                    fontSize: 14,
                    textAlign: "justify",
                    letterSpacing: 0.8,
                    fontWeight: "500",
                    marginTop: 10,
                  }}
                >
                  Also Known as
                </Text>
                {personDetail.also_known_as.map((el) => (
                  <Text style={{ color: "#f2f2f3", textAlign: "left" }}>
                    {"- " + el}
                  </Text>
                ))}
              </>
            )}
          </View>

          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                color: "#8d9cab",
                fontSize: 16,
                fontWeight: "700",
                letterSpacing: 0.8,
              }}
            >
              CREDITS
            </Text>
            <View
              style={{
                marginVertical: 8,
                borderBottomColor: "#99AABB",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            {personDetail.movie_credits.cast
              .concat(personDetail.movie_credits.crew)
              .sort((a, b) => a.release_date - b.release_date)
              .map((el) => {
                return (
                  <TouchableOpacity
                    key={el.credit_id}
                    onPress={() =>
                      navigation.navigate("MovieDetail", { id: el.id })
                    }
                  >
                    <View
                      style={{
                        width: "100%",
                        flex: 1,
                        flexDirection: "row",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderBottomColor: "#f2f2f3",
                      }}
                    >
                      <View style={{ marginVertical: 8 }}>
                        <AspectRatio height={24} ratio={0.6667}>
                          <Image
                            source={{
                              uri: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${el?.poster_path}`,
                            }}
                          />
                        </AspectRatio>
                      </View>
                      <View style={{ marginLeft: 10, marginTop: 16 }}>
                        <Text
                          style={{
                            color: "#f2f2f3",
                            fontSize: 16,
                            fontWeight: "700",
                          }}
                        >
                          {el.name || el.title}
                        </Text>
                        <Text style={{ color: "#f2f2f3", fontSize: 15 }}>
                          {el.character || el.job}
                        </Text>
                        <Text style={{ color: "#f2f2f3", fontSize: 15 }}>
                          {el?.release_date?.slice(0, 4) ||
                            el?.first_air_date?.slice(0, 4)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </Box>
      </ScrollView>
    </View>
  );
}
