import React from "react";
import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import ProfileButton from "../Components/ProfileButton";
import NavBar from "../Components/NavBar";
import MyComponent from "../Components/ReactPaper";

export default function Home() {
  return (
    <PaperProvider>
      <View>
        <MyComponent />
        {/* <NavBar /> */}
        <ProfileButton />
      </View>
    </PaperProvider>
  );
}
