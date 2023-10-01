import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const NoteCard = ({ note }) => {
  const navigation = useNavigation()
  s
  return (
    <TouchableOpacity style={styles.container}
      onPress={() => {
        navigation.navigate("EditNote", { note: note })
      }}
    >


      <View style={styles.content}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.note} lineBreakMode="tail">
          {note.content}
        </Text>
      </View>
      <View style={styles.bottom}>
        <Text style={[styles.note, { marginLeft: 20 }]}>Interesing Idea</Text>
      </View>


    </TouchableOpacity>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: "50%",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(130, 125, 137, 0.6)",
    borderRadius: 8,
    margin: 10,
  },
  content: {
    margin: 20,
  },
  title: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  note: {
    fontFamily: "inter",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 16,
  },
  bottom: {
    width: "100%",
    height: 30,
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(130, 125, 137, 0.4)",
    justifyContent: "center",
  },
});
