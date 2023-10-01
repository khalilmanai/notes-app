import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import HomePage from "../screens/HomePage";
import FinishedNote from "../screens/FinishedNote";
import NewNote from "../screens/NewNote";
import Search from "../screens/Search";
import Settings from "../screens/Settings";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const BottomTabs = ({ navigation }) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#6A3EA1",
        tabBarInactiveTintColor: "#827D89",
        tabBarPosition: "bottom",

        headerLeft: () => (
          <TouchableOpacity
            style={{
              margin: 15,
              flexDirection: "row",
              color: "#6A3EA1",
              alignItems: "center",
            }}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#6A3EA1" />
            <Text style={{ color: "#6A3EA1", fontSize: 16, fontWeight: "500" }}>
              Go Back
            </Text>
          </TouchableOpacity>
        ),
        headerShadowVisible: true,
        headerTitleAlign: "center",
        animationEnabled: true,
        swipeEnabled: true,
        tabBarItemStyle: {
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 10,
        },
        tabBarStyle: [
          {
            display: "flex",
            height: 80,
            backgroundColor: 'white',
            borderTopEndRadius: 20,
            borderTopLeftRadius: 20,

          },
          null,
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomePage") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Finished") {
            iconName = focused
              ? "checkmark-circle"
              : "checkmark-circle-outline";
          } else if (route.name === "NewNote") {
            return (
              <View style={styles.newNoteTab}>
                <Ionicons name="add" size={size + 10} color="white" />
              </View>
            );
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={32} color={color} />;
        },
      })}>
      <Tab.Screen
        options={{ headerShown: false }}
        name="HomePage"
        component={HomePage}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Finished"
        component={FinishedNote}
      />
      <Tab.Screen
        options={{
          tabBarStyle: { display: "none" },
          tabBarLabel: "New Note",
          title: "New Note",
          headerLeft: () => (
            <TouchableOpacity
              style={{
                margin: 15,
                flexDirection: "row",
                color: "#6A3EA1",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("HomePage")}>
              <Ionicons name="chevron-back" size={24} color="#6A3EA1" />
              <Text
                style={{ color: "#6A3EA1", fontSize: 16, fontWeight: "500" }}>
                Go Back
              </Text>
            </TouchableOpacity>
          ),
        }}
        name="NewNote"
        component={NewNote}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  newNoteTab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    top: -30,
  },
});

export default BottomTabs;
