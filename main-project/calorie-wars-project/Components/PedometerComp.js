import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';

import { db, auth } from '../firebase';
import formatDate from '../Utils/formatDate';

export default function PedometerComp() {
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
    const date = formatDate();
    const email = auth.currentUser?.email;

    db.collection('users')
      .doc(email)
      .collection('cals_step_log')
      .doc(date)
      .set(
        {
          steps: isNaN(stepCount) ? 1 : stepCount,
        },
        { merge: true }
      )
      .then(() => {
        console.log('written to the db');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stepCount]);

  return <></>;
}

const styles = StyleSheet.create({});
