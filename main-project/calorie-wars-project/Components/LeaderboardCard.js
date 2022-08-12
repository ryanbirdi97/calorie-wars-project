import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default LeaderboardCard = ({
  targetCalsGoal,
  targetStepsGoal,
  currentCals,
  currentSteps,
  username,
}) => {
  return (
    <View>
      <View>
        <Text>Rank: {}</Text>
        <Text>{username}</Text>
        <Text>
          Steps to Goal: {currentSteps} / {targetStepsGoal}
        </Text>
        <Text>
          Calories to Goal: {currentCals} / {targetCalsGoal}
        </Text>
        <Text>Score: {}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
