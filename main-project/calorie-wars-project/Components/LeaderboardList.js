import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import LeaderboardCard from './LeaderboardCard';
import { v4 as uuidv4 } from 'uuid';

export default LeaderboardList = () => {
  const date = new Date().toLocaleDateString().replace(/\//gi, '-');
  const [targetCalsGoal, setTargetCalsGoal] = useState(0);
  const [targetStepsGoal, setTargetStepsGoal] = useState(0);
  const [currentCals, setCurrentCals] = useState(0);
  const [currentSteps, setCurrentSteps] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  let scoreCals = 0;
  let scoreSteps = 0;

  const email = auth.currentUser?.email;
  const getUserEmail = db.collection('users').doc(email);

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
      .doc(date)
      .onSnapshot((doc) => {
        getUserEmail
          .collection('leaderboard')
          .doc(email + '-leaderboard')
          .update({
            cals_consumed: doc.data().cals_consumed,
            steps: doc.data().steps,
          })
          .then(() => {
            console.log('cals_consumed and steps updated in leaderboard');
          })
          .catch((err) => {
            console.log(err);
          });
        setCurrentCals(doc.data().cals_consumed);
        setCurrentSteps(doc.data().steps);
      });
  }, [currentCals, currentSteps]);

  if (currentCals < targetCalsGoal) {
    scoreCals = ((currentCals / targetCalsGoal) * 50).toFixed(2);
  } else {
    const extraCals = currentCals - targetCalsGoal;
    scoreCals = (((targetCalsGoal - extraCals) / targetCalsGoal) * 50).toFixed(2);
  }

  if (currentSteps < targetStepsGoal)
    scoreSteps = ((currentSteps / targetStepsGoal) * 50).toFixed(2);
  else scoreSteps = 50;

  const [score, setScore] = useState(0);
  //console.log(score);

  useEffect(() => {
    setScore(Number(scoreCals) + Number(scoreSteps));
    console.log(score);
    db.collection('users')
      .doc(email)
      .collection('leaderboard')
      .doc(email + '-leaderboard')
      .set({ score: score }, { merge: true })
      .then(() => {
        console.log('written to db');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [score]);

  useEffect(() => {
    let isMounted = true;
    db.collectionGroup('leaderboard')
      .get()
      .then((querySnapShot) => {
        const leaderboardList = [];
        querySnapShot.forEach((doc) => {
          leaderboardList.push(doc.data());
        });

        leaderboardList.sort(function (a, b) {
          return b.score - a.score;
        });

        if (isMounted) setLeaderboard(leaderboardList);
      });
    return () => {
      isMounted = false;
    };
  }, [leaderboard]);

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.baseText}>Username</Text>
        <Text style={styles.baseText}>Steps to Goal</Text>
        <Text style={styles.baseText}>Cals to Goal</Text>
        <Text style={styles.baseText}>Score</Text>
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
    flex: 9.5,
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
  },
  baseText: {
    fontWeight: '700',
  },
});
