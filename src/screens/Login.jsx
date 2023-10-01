import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TextBox from "../components/TextBox";
import GoogleIcon from "../../assets/google.png";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.15:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();

        console.log(responseData);

        await AsyncStorage.setItem('token ', responseData.token)

        await AsyncStorage.setItem('email', email)

        navigation.navigate("TabBar");
      } else {
        const errorData = await response.json();
        console.error(
          "Error logging a user:",
          errorData.error || "An unknown error occurred"
        );
      }
    } catch (error) {
      console.error("Error logging your user:", error);
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.textContent}>
          <Text style={styles.title}>Let's Login</Text>
          <Text style={styles.desc}>And note your ideas</Text>
        </View>
        <View style={styles.inputs}>
          <TextBox
            keyboardType="email-address"
            secure={false}
            label="Email Address"
            placeholder="Example: JohnDoe@gmail.com"
            value={email}
            onChange={(text) => {
              setEmail(text);
            }}
          />
          <TextBox
            keyboardType="default"
            value={password}
            onChange={(text) => {
              setPassword(text);
            }}
            secure={true}
            label="Password"
            placeholder="********"
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              handleLogin();
              setEmail("");
              setPassword("");
            }}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
            <Icon
              name="arrow-forward-outline"
              size={24}
              color="#fff"
              style={styles.loginButtonIcon}
            />
          </TouchableOpacity>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.dividerLine} />
          </View>
          <TouchableOpacity onPress={() => { }} style={styles.googleButton}>
            <Image
              source={GoogleIcon}
              resizeMode="contain"
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Sign in With Google</Text>
            <Icon
              name="arrow-forward-outline"
              size={24}
              color="#6A3EA1"
              style={styles.googleButtonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.push("Register");
            }}>
            <Text style={styles.registerText}>
              Don't Have any account? Register here
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    marginTop: 100,
  },
  textContent: {
    flexDirection: "column",
    gap: 16,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 16,
    color: "gray",
  },
  inputs: {
    marginTop: 60,
    gap: 30,
    marginBottom: 20,
  },
  forgotPassword: {
    fontSize: 18,
    color: "#6A3EA1",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  buttons: {
    marginTop: 50,
    gap: 20,
    flexDirection: "column",
    height: "30%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  loginButton: {
    width: "90%",
    height: 60,
    backgroundColor: "#6A3EA1",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loginButtonText: {
    fontSize: 18,
    color: "#FFF",
  },
  loginButtonIcon: {
    position: "absolute",
    right: 20,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    width: "23%",
    opacity: 0.4,
    backgroundColor: "gray",
  },
  dividerText: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 14,
  },
  googleButton: {
    width: "90%",
    height: 60,
    borderWidth: 2,
    borderColor: "#6A3EA1",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  googleIcon: {
    width: 20,
  },
  googleButtonText: {
    fontSize: 18,
    color: "#6A3EA1",
  },
  googleButtonIcon: {
    position: "absolute",
    right: 20,
  },
  registerText: {
    fontSize: 16,
    color: "#6A3EA1",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
});
