import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase";

const ProfileButton = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProfilePage");
        }}
      >
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/2048px-OOjs_UI_icon_userAvatar.svg.png",
          }}
          style={{ width: 10, height: 10 }}
        />
      </TouchableOpacity>
      <Text>Logged In</Text>
    </View>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({});
