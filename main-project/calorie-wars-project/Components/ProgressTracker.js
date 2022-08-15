import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

import { db, auth } from '../firebase';
import firebase from 'firebase';

import * as Progress from 'react-native-progress';

export default function ProgressTracker({ isLoading, setIsLoading }) {
  const [progress, setProgress] = useState({});

  const [calorieGoal, setCalorieGoal] = useState(0);
  const [stepGoal, setStepGoal] = useState(0);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [stepsWalked, setStepsWalked] = useState(0);

  const date = new Date().toLocaleDateString('en-US').replace(/\//gi, '-');

  useEffect(() => {
    if (isLoading) {
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
              console.log(obj, goalObj, ' << from db');
              setIsLoading(false);
            });
        });
      console.log(progress, ' << progress');
    }
  }, [isLoading]);

  return (
    <View>
      <Text>
        ProgressTracker: {progress.calories} {progress.steps}
      </Text>
      <Progress.Circle
        size={130}
        showsText={true}
        formatText={() => {
          return isNaN(progress.calories) ? 'add cal target in profile page' : progress.calories;
        }}
        progress={progress.calories}
        allowFontScaling={true}
      />
      <Progress.Circle
        size={130}
        showsText={true}
        formatText={() => {
          return 'steps:' + progress.steps;
        }}
        allowFontScaling={true}
        progress={progress.steps}
      />
    </View>
  );
}
