import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Stack,
  Image,
} from "native-base";
import {
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
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MovieDetail", { id: data.id })}
    >
      <Box alignItems="center" marginX={1} marginBottom={3}>
        <Box width="32" overflow="hidden">
          <AspectRatio w="100%" ratio={2 / 3} borderRadius={"sm"}>
            <Image
              source={
                data.poster_path
                  ? {
                      uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
                    }
                  : ""
              }
              alt="image"
              borderRadius={"sm"}
            />
          </AspectRatio>
          <Center
            bg="yellow.200:alpha.20"
            _text={{
              color: "#181b20",
              fontWeight: "700",
              fontSize: "12",
            }}
            position="absolute"
            top="0"
            right={0}
            px="1"
            py="1.5"
            flexDir={"row"}
            borderBottomLeftRadius="md"
            borderTopRightRadius={"sm"}
          >
            <Ionicons name={"star"} style={{ marginRight: 3 }} color="yellow" />
            {Math.round((data.vote_average + Number.EPSILON) * 10) / 10}
          </Center>
          <Stack paddingY={2} space={3} height={12} paddingX={1}>
            <Text style={{ color: "#f2f2f3" }}>{data.original_title}</Text>
          </Stack>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}
