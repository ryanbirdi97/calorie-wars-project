import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LeaderboardList from '../Components/LeaderboardList';

export default Leaderboard = () => {
  return (
    <View>
      <Text>Daily Calorie Wars Winners</Text>
      <LeaderboardList />
    </View>
  );
};

const styles = StyleSheet.create({});
