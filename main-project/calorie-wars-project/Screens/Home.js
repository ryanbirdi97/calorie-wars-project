import React from "react";
import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import ProfileButton from "../Components/ProfileButton";
import NavBar from "../Components/NavBar";

export default function Home() {
  return (
    <PaperProvider>
      <View>
        <NavBar />
        <ProfileButton />
      </View>
    </PaperProvider>
  );
}
