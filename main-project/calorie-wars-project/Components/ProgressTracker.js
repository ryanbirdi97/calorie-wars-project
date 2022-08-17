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
    });

  return (
    <View style={styles.progressTracker}>
      <View style={styles.progressCircles}>
        <Progress.Circle
          size={100}
          color="#00C2A5"
          showsText={true}
          strokeCap="round"
          thickness={5}
          formatText={() => {
            return isNaN(caloriesConsumed / calorieGoal)
              ? 0
              : ((caloriesConsumed / calorieGoal) * 100).toFixed(2) + '%';
          }}
          progress={isNaN(+caloriesConsumed) ? 0 : caloriesConsumed / calorieGoal}
          allowFontScaling={true}
        />
        <Progress.Circle
          size={100}
          color="#184EA6"
          showsText={true}
          thickness={5}
          strokeCap="round"
          formatText={() => {
            return isNaN(stepsWalked / stepGoal)
              ? 0 + '%'
              : '' + ((stepsWalked / stepGoal) * 100).toFixed(2) + '%';
          }}
          allowFontScaling={true}
          progress={isNaN(+stepsWalked) ? 0 : stepsWalked / stepGoal}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.caloriesText}>
          {typeof caloriesConsumed === 'number'
            ? '\n\n' + Math.round(caloriesConsumed) + '/' + calorieGoal + ' kcal'
            : '\n\n0/' + calorieGoal + ' kcal:'}
        </Text>
        <Text style={styles.stepsText}>
          {typeof stepsWalked === 'number'
            ? '\n\n' + stepsWalked + '/' + stepGoal + ' steps'
            : '\n\n0/' + stepGoal}
        </Text>
      </View>
    </View>
  );
}

// 93% Denim -> #184EA6 steps
// 89% Turquoise -> #00C2A5 calories

const styles = StyleSheet.create({
  progressCircles: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  progressTracker: {
    paddingBottom: 90,
  },
  caloriesText: { color: '#00C2A5' },
  stepsText: { color: '#184EA6' },
  textContainer: { flexDirection: 'row', justifyContent: 'space-around' },
});
