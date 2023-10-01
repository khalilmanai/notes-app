import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import arrow from "../../assets/Arrow.png";
import HomeImage from "../../assets/HomeImage.png";

const windowHeight = Dimensions.get("window").height;

export default function NoNotes() {
  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <View style={styles.content}>
        <Image source={HomeImage} />
        <Text style={styles.title}>Start your journey</Text>
        <Text style={styles.desc}>
          Every big step starts with a small step. Note your first idea and
          start your journey
        </Text>
        <Image style={styles.img} source={arrow} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    margin: 70,
    height: "70%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
  },
  desc: {
    fontSize: 14,
    fontWeight: "400",
    color: "#827D89",
  },
});
