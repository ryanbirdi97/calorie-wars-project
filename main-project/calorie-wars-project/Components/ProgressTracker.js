import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import { db, auth } from '../firebase';

import * as Progress from 'react-native-progress';

import formatDate from '../Utils/formatDate';

export default function ProgressTracker() {
  const [calorieGoal, setCalorieGoal] = useState(1);
  const [stepGoal, setStepGoal] = useState(1);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [stepsWalked, setStepsWalked] = useState(0);

  const date = formatDate(); // 16-08-2022

  const email = auth.currentUser?.email;
  db.collection('users')
    .doc(email)
    .collection('cals_step_log')
    .doc(date)
    .onSnapshot((result) => {
      const obj = result.data();
      setCaloriesConsumed(obj.cals_consumed);
      setStepsWalked(obj.steps);
      db.collection('users')
        .doc(email)
        .collection('goals')
        .doc(email + '-goals')
        .onSnapshot((goals) => {
          const goalObj = goals.data();
          setCalorieGoal(goalObj.calorie_goal);
          setStepGoal(goalObj.step_goal);
          console.log('here fetching the data from db');
        });
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <View>
      <View style={styles.progressCircles}>
        <Text>{'\n\n' + Math.round(caloriesConsumed) + '/' + '' + calorieGoal + ' kcal:'}</Text>
        <Progress.Circle
          size={80}
          showsText={true}
          formatText={() => {
            return isNaN(caloriesConsumed / calorieGoal)
              ? 0
              : ((caloriesConsumed / calorieGoal) * 100).toFixed(2) + '%';
          }}
          progress={isNaN(+caloriesConsumed) ? 0 : caloriesConsumed / calorieGoal}
          allowFontScaling={true}
        />
        <Text>
          {typeof stepsWalked === 'number'
            ? '\n\n' + stepsWalked + '/' + '' + stepGoal + ' steps:'
            : '\n\n0/' + '' + stepGoal}
        </Text>
        <Progress.Circle
          size={80}
          showsText={true}
          formatText={() => {
            return isNaN(stepsWalked / stepGoal)
              ? 0 + '%'
              : '' + ((stepsWalked / stepGoal) * 100).toFixed(2) + '%';
          }}
          allowFontScaling={true}
          progress={isNaN(+stepsWalked) ? 0 : stepsWalked / stepGoal}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressCircles: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
});
