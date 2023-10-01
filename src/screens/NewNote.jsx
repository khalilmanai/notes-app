import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContentModal from "../components/ContentModal";

const NewNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pressedButton, setPressedButton] = useState(null); // Track pressed button
  const [visible , setVisible] = useState(false) // handles modal toggle Press

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleDescriptionChange = (text) => {
    if (text.length <= 5000) {
      setDescription(text);
    }
  };

  const handleButtonPress = (buttonName) => {
    if (pressedButton === buttonName) {
      setPressedButton(null); // Unpress the button
    } else {
      setPressedButton(buttonName); // Press the button
    } if(buttonName === 'ellipsis'){
      setVisible(!visible)
    }
  };

  const isButtonPressed = (buttonName) => pressedButton === buttonName;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <TextInput
          placeholder="New Product Ideas"
          placeholderTextColor="black"
          style={styles.TextTitle}
          value={title}
          onChangeText={handleTitleChange}
        />
        <TextInput
          placeholder="Create a mobile app UI Kit that provides a basic notes functionality but with some improvements. There will be a choice to select what kind of notes the user needs, so the note-taking experience can be tailored to individual requirements."
          placeholderTextColor="#827D89"
          style={styles.TextDesc}
          multiline={true}
          textAlignVertical="top"
          value={description}
          onChangeText={handleDescriptionChange}
          maxLength={5000}
        />
      </ScrollView>
      <View style={styles.bottomControls}>
        <View style={styles.controls}>
          <Text>Last edited on 19:30</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => handleButtonPress("search")}
              style={[
                styles.button,
                isButtonPressed("search") && styles.pressedButton,
              ]}>
              <Ionicons
                name={isButtonPressed("search") ? "search" : "search-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleButtonPress("bookmark")}
              style={[
                styles.button,
                isButtonPressed("bookmark") && styles.pressedButton,
              ]}>
              <Ionicons
                name={
                  isButtonPressed("bookmark") ? "bookmark" : "bookmark-outline"
                }
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleButtonPress("ellipsis")}
              style={[
                styles.button,
                isButtonPressed("ellipsis") && styles.pressedButton,
              ]}>
              <Ionicons
                name={
                  isButtonPressed("ellipsis")
                    ? "ellipsis-horizontal"
                    : "ellipsis-horizontal-outline"
                }
                size={24}
                color="black"
              />
            </TouchableOpacity>
            
            {
              <ContentModal
              isVisible={visible}
              onClose = {()=>{
                setVisible(false)
              }}
              />
            }
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  TextTitle: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 10,
  },
  TextDesc: {
    width: "100%",
    fontSize: 16,
    color: "#000",
    paddingTop: 10,
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  remainingCharacters: {
    alignSelf: "flex-end",
    marginTop: 5,
    color: "#666",
  },
  bottomControls: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFF",
    justifyContent: "center",
    height: "8%",
    borderTopWidth: 1,
    borderTopColor: "#EFEEF0",
    alignItems: "center",
  },
  controls: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    margin: 10,
    alignItems: "center",
  },
});
