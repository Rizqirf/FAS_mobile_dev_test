import { AspectRatio, Box, Center, Heading, HStack, Stack } from "native-base";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import colors from "../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function MovieCard({ data }) {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MovieList", { name: data.original_title })
      }
    >
      <Box alignItems="center" marginX={1} marginBottom={3}>
        <Box
          width={windowWidth / 3 - 9}
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          backgroundColor="gray.700"
          borderWidth="1"
        >
          <Box>
            <AspectRatio w="100%" ratio={9 / 12}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
                }}
                alt="image"
              />
            </AspectRatio>
            <Center
              bg="yellow.200:alpha.60"
              _text={{
                color: "warmGray.800:alpha.80",
                fontWeight: "500",
                fontSize: "12",
              }}
              position="absolute"
              top="0"
              right={0}
              px="1"
              py="1.5"
              flexDir={"row"}
            >
              <Ionicons
                name={"star"}
                style={{ marginRight: 3 }}
                color="yellow"
              />
              {Math.round((data.vote_average + Number.EPSILON) * 100) / 100}
            </Center>
          </Box>
          <Stack paddingY={2} space={3} height={12} paddingX={1}>
            <Text>{data.original_title}</Text>
            {/* <Heading size="xs" ml="1">
              {data.original_title}
            </Heading> */}
          </Stack>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
