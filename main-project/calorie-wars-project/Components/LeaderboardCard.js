import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default LeaderboardCard = ({ obj }) => {
  console.log('inside leaderboard card');

  return (
    <View>
      <View style={styles.container}>
        <Text>{obj.username}</Text>
        <Text>
          {obj.steps}/{obj.step_goal}
        </Text>
        <Text>
          {obj.cals_consumed}/{obj.calorie_goal}
        </Text>
        <Text>{obj.score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1faee',
    margin: 5,
    padding: 5,
    borderColor: 'black',
    borderWidth: 2,
    fontSize: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
