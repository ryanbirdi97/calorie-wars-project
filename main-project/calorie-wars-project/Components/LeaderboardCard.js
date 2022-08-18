import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default LeaderboardCard = ({ obj }) => {
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
    backgroundColor: '#EDF2F4',
    margin: 4,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: '#2B2D42',
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
