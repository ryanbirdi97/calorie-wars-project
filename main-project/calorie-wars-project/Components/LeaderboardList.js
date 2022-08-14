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

  useEffect(() => {
    getUserEmail
      .collection('goals')
      .doc(email + '-goals')
      .onSnapshot((doc) => {
        setTargetCalsGoal(doc.data().calorie_goal);
        setTargetStepsGoal(doc.data().step_goal);
      });
  }, []);

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
  const leaderboardList = [];

  // useEffect(() => {
  db.collectionGroup('leaderboard')
    .get()
    .then((querySnapShot) => {
      const leaderboardList = [];
      querySnapShot.forEach((doc) => {
        leaderboardList.push(doc.data());
      });

      leaderboardList.sort(function (a, b) {
        return a.position - b.position;
      });
      setLeaderboard(leaderboardList);
    });
  // }, []);

  //console.log(leaderboard, '<----');
  return (
    // <View style={styles.container}>
    <View>
      <View style={styles.container}>
        <View style={styles.cardHeader}>
          <Text style={styles.baseText}>#</Text>
          <Text style={styles.baseText}>Username</Text>
          <Text style={styles.baseText}>Steps to Goal</Text>
          <Text style={styles.baseText}>Cals to Goal</Text>
          <Text style={styles.baseText}>Score</Text>
        </View>
      </View>
      <View>
        {leaderboard.map((obj) => (
          <LeaderboardCard key={uuidv4()} obj={obj} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 55,
    margin: 5,
    padding: 2,
    backgroundColor: '#dee2e6',
    borderColor: 'black',
    borderWidth: 2,
  },
  cardHeader: {
    backgroundColor: '#9d0208',
    margin: 5,
    padding: 5,
    borderColor: 'black',
    borderWidth: 2,
    fontSize: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 37,
  },
  baseText: {
    fontWeight: '700',
  },
});
