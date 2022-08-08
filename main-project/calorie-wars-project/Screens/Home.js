import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import { Provider as PaperProvider } from "react-native-paper";

export default function Home() {
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
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
}
