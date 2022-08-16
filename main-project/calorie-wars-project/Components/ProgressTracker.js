import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import { db, auth } from '../firebase';

import * as Progress from 'react-native-progress';

import formatDate from '../Utils/formatDate';

export default function ProgressTracker({ isLoading, setIsLoading }) {
  const [progress, setProgress] = useState({});

  const [calorieGoal, setCalorieGoal] = useState(1);
  const [stepGoal, setStepGoal] = useState(1);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [stepsWalked, setStepsWalked] = useState(0);

  const date = formatDate(); // 16-08-2022

  useEffect(() => {
    setProgress(() => {
      return {
        calories: caloriesConsumed / calorieGoal,
        steps: stepsWalked / stepGoal,
      };
    });
    const email = auth.currentUser?.email;
    db.collection('users')
      .doc(email)
      .collection('cals_step_log')
      .doc(date)
      .get()
      .then((result) => {
        const obj = result.data();
        setCaloriesConsumed(obj.cals_consumed.totalCalories);
        setStepsWalked(obj.steps.totalSteps);
        db.collection('users')
          .doc(email)
          .collection('goals')
          .doc(email + '-goals')
          .get()
          .then((goals) => {
            const goalObj = goals.data();
            setCalorieGoal(goalObj.calorie_goal);
            setStepGoal(goalObj.step_goal);

            setIsLoading(false);
          });
      });
  }, [isLoading]);

  return (
    <View>
      <View style={styles.progressCircles}>
        <Text>{'\n\n' + caloriesConsumed + '/' + '' + calorieGoal + ' kcal:'}</Text>
        <Progress.Circle
          size={80}
          showsText={true}
          formatText={() => {
            return isNaN(progress.calories) ? 0 : (progress.calories * 100).toFixed(2) + '%';
          }}
          progress={progress.calories}
          allowFontScaling={true}
        />
        <Text>{'\n\n' + stepsWalked + '/' + '' + stepGoal + ' steps:'}</Text>
        <Progress.Circle
          size={80}
          showsText={true}
          formatText={() => {
            return isNaN(progress.steps) ? 0 : '' + (progress.steps * 100).toFixed(2) + '%';
          }}
          allowFontScaling={true}
          progress={progress.steps}
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
