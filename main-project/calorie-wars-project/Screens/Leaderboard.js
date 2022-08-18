import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LeaderboardList from '../Components/LeaderboardList';

export default Leaderboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Calorie Wars Winners</Text>
      {/* <LeaderboardList /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    marginTop: 60,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '700',
  },
});
