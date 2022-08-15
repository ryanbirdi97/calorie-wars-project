import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';

import { db, auth } from '../firebase';
import firebase from 'firebase';

export default function PedometerComp({ setIsLoading }) {
  const [isAvailable, setIsAvailable] = useState('checking');
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    Pedometer.isAvailableAsync()
      .then((result) => {
        setIsAvailable(String(result));
      })
      .catch((error) => {
        setIsAvailable('Could not get isPedometerAvailable: ' + error);
      });
  }, []);

  useEffect(() => {
    // get step counts
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end)
      .then((result) => {
        setStepCount(result.steps);
      })
      .catch((err) => {
        console.log(err);
      });

    Pedometer.watchStepCount((result) => {
      result.steps;
    });
  }, [setStepCount]);

  useEffect(() => {
    const date = new Date().toLocaleDateString('en-US').replace(/\//gi, '-'); // 08/11/22
    const email = auth.currentUser?.email;

    db.collection('users')
      .doc(email)
      .collection('cals_step_log')
      .doc(date)
      .set(
        {
          steps: { totalSteps: stepCount },
        },
        { merge: true }
      )
      .then(() => {
        setIsLoading(false);
        console.log('written to the db');
      });
  }, [stepCount]);

  return <></>;
}

const styles = StyleSheet.create({});
