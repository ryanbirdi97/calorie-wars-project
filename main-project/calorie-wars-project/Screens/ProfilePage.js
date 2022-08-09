import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { auth } from "../firebase";
import { Provider as PaperProvider } from "react-native-paper";

export default function ProfilePage() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <PaperProvider>
      <View>
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/2048px-OOjs_UI_icon_userAvatar.svg.png",
            }}
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
}
