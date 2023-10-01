import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteCard from "../components/NoteCard";

const FinishedNote = () => {
  const [notes, setNotes] = useState([]);


  const fetchUserNotes = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("email");
      if (!storedEmail) {
        console.error("Email not found in AsyncStorage");
        return;
      }
      const response = await fetch(`http://192.168.1.15:3000/fetch-notes?email=${encodeURIComponent(storedEmail)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch user notes");
        return;
      }

      const data = await response.json();
      setNotes(data.notes);

    } catch (error) {
      console.error("Error fetching user notes:", error);
    }
  };

  useEffect(() => {
    fetchUserNotes();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ marginTop: "20%", marginLeft: "5%" }}>
          <Text style={styles.title}>Amazing Journey!</Text>
          <Text style={styles.desc}>
            You have successfully finished {notes.length} notes
          </Text>
        </View>
        <Image source={require("../../assets/HeaderSideFinished.png")} style={styles.img} />
      </View>

      {notes.map((note, index) => (
        <NoteCard note={note} key={index} />
      ))}



    </View>
  );
};

export default FinishedNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: "25%",
    backgroundColor: "#6A3EA1",
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#EFE9F7",
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    fontWeight: "400",
    color: "#EFE9F7",
  },
  img: {
    resizeMode: "contain",
    width: 150,
    height: 150,
    position: "absolute",
    right: 10,
    bottom: -30,
  },
});
