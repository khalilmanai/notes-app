import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TextBox from "../components/TextBox";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [reTypedpassword, setRPassword] = useState("");
  const navigation = useNavigation();

  const HandleRegister = async () => {
    try {
      const response = await fetch("http://192.168.1.15:3000/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
      } else {
        console.error("error registering a user");
      }
    } catch (error) {
      console.error(" Error registering a user ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
            <Icon
              style={{ fontWeight: "700" }}
              name="chevron-back"
              size={16}
              color="#6A3EA1"
            />
            <Text style={{ color: "#6A3EA1", fontWeight: "bold" }}>
              Back to Login
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.desc}>and start taking notes.</Text>
        </View>
        <View style={styles.inputs}>
          <TextBox
            secure={false}
            label="Full Name"
            placeholder="Example: John Doe"
            value={username}
            onChange={(text) => {
              setName(text);
            }}
          />
          <TextBox
            keyboardType="email-address"
            secure={false}
            label="Email Address"
            placeholder="Example: john@example.com"
            value={email}
            onChange={(text) => {
              setEmail(text);
            }}
          />
          <TextBox
            secureTextEntry
            label="Password"
            placeholder="*********"
            value={password}
            onChange={(text) => {
              setPassword(text);
            }}
          />
          <TextBox
            secure={false}
            label="Retype Password"
            placeholder="*********"
            value={reTypedpassword}
            onChange={(text) => {
              setRPassword(text);
            }}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Button
            bg="#6A3EA1"
            bw={1}
            text="Create Account"
            textColor="white"
            icon="arrow-forward-outline"
            onClick={() => {
              HandleRegister();
              setEmail("");
              setPassword("");
              setName("");
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    margin: 16,
  },
  header: {
    height: "20%",
    justifyContent: "space-between",
    margin: 10,
  },
  title: {
    fontSize: 56,
    fontWeight: "bold",
  },
  desc: {
    color: "gray",
    marginTop: 10,
  },
  inputs: {
    flexDirection: "column",
    gap: 20,
  },
});
