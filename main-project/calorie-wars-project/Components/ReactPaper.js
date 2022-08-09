import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";

const HomeRoute = () => <Text>Home</Text>;

const LeaderboardRoute = () => <Text>Leaderboard</Text>;

const SignOutRoute = () => <Text>Sign Out</Text>;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    { key: "leaderboard", title: "Leaderboard", focusedIcon: "album" },
    {
      key: "signOut",
      title: "SignOut",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    leaderboard: LeaderboardRoute,
    signOut: SignOutRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;
