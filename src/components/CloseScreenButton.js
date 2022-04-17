import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const CloseScreenButton = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        position: "absolute",
        top: top + 20,
        left: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
      }}
    >
      <AntDesign name="close" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default CloseScreenButton;

const styles = StyleSheet.create({});
