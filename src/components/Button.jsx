import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const WideButton = ({
  bg,
  text,
  bw,
  borderColor,
  onClick,
  icon,
  textColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        width: "90%",
        height: 60,
        backgroundColor: `${bg}`,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        borderWidth: bw,
        borderColor: borderColor,
      }}>
      <Text style={{ fontSize: 18, color: `${textColor}`, fontWeight: "bold" }}>
        {text}
      </Text>
      <Icon
        name={icon}
        size={24}
        color="#fff"
        style={{
          position: "absolute",
          right: 20,
        }}
      />
    </TouchableOpacity>
  );
};

export default WideButton;
