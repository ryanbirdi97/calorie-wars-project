import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default LeaderboardCard = ({ obj }) => {
  // console.log(obj.Object.username, '<---');
  return (
    <View>
      <View>
        <Text>Rank: {obj.position}</Text>
        <Text>{obj.username}</Text>
        <Text>
          Steps to Goal: {obj.steps} / {obj.step_goal}
        </Text>
        <Text>
          Calories to Goal: {obj.cals_consumed} / {obj.calorie_goal}
        </Text>
        <Text>Score: {obj.score}</Text>
        <Text>-------</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
