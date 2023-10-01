import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppContainer from "./src/navigation/AppContainer";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadCustomFont() {
      await Font.loadAsync({
        inter: require("./assets/font/Inter-Regular.ttf"),
      });
      setFontLoaded(true);
    }

    loadCustomFont();
  }, []);

  if (!fontLoaded) {
    // You can return a loading screen or null while the font is loading
    return null;
  }

  return (
    <View style={styles.container}>
      <AppContainer />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "inter",
  },
});
