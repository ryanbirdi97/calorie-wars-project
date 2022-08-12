import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';

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
    Pedometer.getStepCountAsync(start, end).then((result) => {
      setStepCount(result.steps);
    });

    Pedometer.watchStepCount((result) => {
      result.steps;
    });
  }, [setStepCount]);

  return (
    <View>
      <Text>
        is Pedometer available: {isAvailable} and step count: {stepCount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
