import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default LeaderboardCard = ({ obj }) => {
  return (
    <View>
      <View>
        <Text>{obj.position}</Text>
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

const styles = StyleSheet.create({});
