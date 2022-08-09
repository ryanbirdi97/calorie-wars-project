import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { BottomNavigation } from "react-native-paper";

const HomeRoute = () => <Text>Home</Text>;

const LeaderboardRoute = () => <Text>Leaderboard</Text>;

const SignOutRoute = () => <Text>Sign Out</Text>;

const NavBar = () => {
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
    <View>
      <TouchableOpacity></TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({});
