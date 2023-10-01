import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Illustation from "../../assets/Illustration.png";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigation = useNavigation();
  useEffect(() => {
    checkAuthenticated()
  }, [])

  const checkAuthenticated = async () => {

    const token = AsyncStorage.getItem('token')
    if (token) {
      console.log(token)
      navigation.navigate('TabBar', { screen: 'HomePage' });

      return;

    }



    navigation.navigate('Login')
  }

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#6A3EA1",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}>
      <Image
        source={Illustation}
        alt="image"
        resizeMode="contain"
        style={{ marginTop: 100 }}
      />
      <Text
        style={{
          fontSize: 25,
          textAlign: "center",
          margin: 15,
          color: "white",
          fontWeight: "bold",
        }}>
        Jot Down anything you want to achieve, today or in the future
      </Text>
      <TouchableOpacity
        onPress={() => {
          checkAuthenticated()
        }}
        style={{
          width: "90%",
          height: 60,
          backgroundColor: "white",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginTop: 20,
        }}>
        <Text style={{ fontSize: 18, color: "#6A3EA1" }}>
          Let's Get Started
        </Text>
        <Icon
          name="arrow-forward-outline"
          size={24}
          color="#6A3EA1"
          style={{
            position: "absolute",
            right: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
