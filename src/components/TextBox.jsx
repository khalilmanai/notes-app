import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const TextBox = ({
  placeholder,
  secure,
  label,
  keyboardType,
  onChange,
  value,
}) => {
  return (
    <View>
      <Text style={{ color: "#111", fontSize: 16, fontWeight: 500 }}>
        {label}
      </Text>
      <TextInput
        secureTextEntry={secure}
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize="none"
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "#C8C5CB",
    borderRadius: 8,
    width: "100%",
    padding: 16,
    marginTop: 10,
    color: "#C8C5CB",
  },
});

export default TextBox;
