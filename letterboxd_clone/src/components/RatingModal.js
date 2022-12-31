import { Button, Center, Modal } from "native-base";
import { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Rating, AirbnbRating } from "react-native-ratings";

export default function RatingModal({ name }) {
  const [showModal, setShowModal] = useState(false);
  const [isRated, setRated] = useState(false);
  const [rate, setRate] = useState(5);
  const [temp, setTemp] = useState(0);
  function ratingCompleted(rating) {
    setTemp(rating);
    console.log("Rating is: " + rating);
  }
  return (
    <Center>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Ionicons
          name={isRated ? "star" : "star-outline"}
          size={24}
          color={"blue"}
          style={{ alignSelf: "center" }}
        />
        <Text style={{ alignSelf: "center", fontSize: 14, color: "#8d9cab" }}>
          {isRated ? "Rated" : "Rate this"}
        </Text>
      </TouchableOpacity>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          bg: "coolGray.800",
        }}
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header color={"#181b20"}>{name}</Modal.Header>
          <Modal.Body>
            <Rating
              showRating
              startingValue={rate}
              type="custom"
              ratingTextColor="#181b20"
              onFinishRating={ratingCompleted}
              ratingCount={10}
              imageSize={30}
              style={{ padding: 10 }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setRate(temp);
                  setRated(true);
                  setShowModal(false);
                }}
                backgroundColor="#00e054"
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
