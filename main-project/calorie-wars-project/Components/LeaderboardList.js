import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { db, auth } from '../firebase';
import LeaderboardCard from './LeaderboardCard';
import { v4 as uuidv4 } from 'uuid';

export default LeaderboardList = () => {
  console.log('This is a test on leaderboard2');

  //const [targetCalsGoal, setTargetCalsGoal] = useState(0);
  //const [targetStepsGoal, setTargetStepsGoal] = useState(0);
  //const [currentCals, setCurrentCals] = useState(0);
  //const [currentSteps, setCurrentSteps] = useState(0);
  //const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  let scoreCals = 0;
  let scoreSteps = 0;
  let rank = 1;
  let targetCalsGoal = 0;
  let targetStepsGoal = 0;
  let currentCals = 0;
  let currentSteps = 0;
  let username = '';

  const email = auth.currentUser?.email;
  const getUserEmail = db.collection('users').doc(auth.currentUser?.email);

  getUserEmail
    .collection('goals')
    .doc(email + '-goals')
    .onSnapshot((doc) => {
      targetCalsGoal = doc.data().calorie_goal;
      targetStepsGoal = doc.data().step_goal;
    });

  getUserEmail
    .collection('cals_step_log')
    .doc(email + '-cal_step_log')
    .onSnapshot((doc) => {
      currentCals = doc.data().cals_consumed;
      currentSteps = doc.data().steps;
    });

  getUserEmail.onSnapshot((doc) => {
    username = doc.data().username;
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

  let leaderboardList = [];

  db.collectionGroup('leaderboard')
    .get()
    .then((querySnapShot) => {
      //leaderboardList = { ...querySnapShot };
      return querySnapShot.forEach((doc) => {
        return leaderboardList.push(doc.data());
        //setLeaderboard((currentLeaderboard) => {
        //return [...currentLeaderboard, doc.data()];
      });
    })
    .then((doc) => console.log(doc));

  //console.log(leaderboard, '<------');

  return (
    <View>
      <Text>Hello</Text>
      {/*{leaderboard.map((obj) => (
        <LeaderboardCard key={uuidv4()} obj={obj} />
      ))}*/}
    </View>
  );
};

const styles = StyleSheet.create({});
