import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import LeaderboardCard from './LeaderboardCard';
import { v4 as uuidv4 } from 'uuid';

export default LeaderboardList = () => {
  const [targetCalsGoal, setTargetCalsGoal] = useState(0);
  const [targetStepsGoal, setTargetStepsGoal] = useState(0);
  const [currentCals, setCurrentCals] = useState(0);
  const [currentSteps, setCurrentSteps] = useState(0);
  const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  let scoreCals = 0;
  let scoreSteps = 0;
  let rank = 1;

  const email = auth.currentUser?.email;
  const getUserEmail = db.collection('users').doc(auth.currentUser?.email);

  console.log('hello');

  useEffect(() => {
    getUserEmail
      .collection('goals')
      .doc(email + '-goals')
      .onSnapshot((doc) => {
        setTargetCalsGoal(doc.data().calorie_goal);
        setTargetStepsGoal(doc.data().step_goal);
      });
  }, [targetCalsGoal, targetStepsGoal]);

  useEffect(() => {
    getUserEmail
      .collection('cals_step_log')
      .doc(email + '-cal_step_log')
      .onSnapshot((doc) => {
        setCurrentCals(doc.data().cals_consumed);
        setCurrentSteps(doc.data().steps);
      });
  }, []);

  useEffect(() => {
    getUserEmail.onSnapshot((doc) => {
      setUsername(doc.data().username);
    });
  }, []);

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

  useEffect(() => {
    db.collectionGroup('leaderboard')
      .get()
      .then((querySnapShot) => {
        const leaderboardList = [];
        querySnapShot.forEach((doc) => {
          leaderboardList.push(doc.data());
        });
        setLeaderboard(leaderboardList);
      });
  }, []);

  return (
    <View>
      <Text>Hello</Text>
      {leaderboard.map((obj) => (
        <LeaderboardCard key={uuidv4()} obj={obj} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});
