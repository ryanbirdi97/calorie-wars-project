import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { db, auth } from '../firebase';
import LeaderboardCard from './LeaderboardCard';

export default LeaderboardList = () => {
  const [targetCalsGoal, setTargetCalsGoal] = useState(0);
  const [targetStepsGoal, setTargetStepsGoal] = useState(0);
  const [currentCals, setCurrentCals] = useState(0);
  const [currentSteps, setCurrentSteps] = useState(0);
  const [username, setUsername] = useState('');

  let scoreCals = 0;
  let scoreSteps = 0;
  let rank = 1;

  const email = auth.currentUser?.email;
  const getUserEmail = db.collection('users').doc(auth.currentUser?.email);

  getUserEmail
    .collection('goals')
    .doc(email + '-goals')
    .onSnapshot((doc) => {
      setTargetCalsGoal(doc.data().calorie_goal);
      setTargetStepsGoal(doc.data().step_goal);
    });

  getUserEmail
    .collection('cals_step_log')
    .doc(email + '-cal_step_log')
    .onSnapshot((doc) => {
      setCurrentCals(doc.data().cals_consumed);
      setCurrentSteps(doc.data().steps);
    });

  getUserEmail.onSnapshot((doc) => {
    setUsername(doc.data().username);
  });

  if (currentCals < targetCalsGoal) {
    scoreCals = ((currentCals / targetCalsGoal) * 50).toFixed(2);
  } else {
    const extraCals = currentCals - targetCalsGoal;
    scoreCals = (((targetCalsGoal - extraCals) / targetCalsGoal) * 50).toFixed(2);
  }

  if (currentSteps < targetStepsGoal)
    scoreSteps = ((currentSteps / targetStepsGoal) * 50).toFixed(2);
  else scoreSteps = 50;

  const score = Number(scoreCals) + Number(scoreSteps);
  const leaderboardList = [];

  const [leaderboard, setLeaderboard] = useState([]);

  db.collectionGroup('leaderboard')
    .get()
    .then((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        leaderboardList.push(doc);
      });
      setLeaderboard(leaderboardList);
    });

  console.log(leaderboard);
  return (
    <View>
      {leaderboardListArray.map((obj) => (
        <LeaderboardCard key={email} obj={obj} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});
