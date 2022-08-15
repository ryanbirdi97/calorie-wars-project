import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';

import FoodCard from './FoodCard';

export default function FoodLog({ isLoading, setIsLoading }) {
  const [foodArr, setFoodArr] = useState([]);

  if (isLoading) {
    const date = new Date().toLocaleDateString().replace(/\//gi, '-');
    const email = auth.currentUser?.email;
    db.collection('users')
      .doc(email)
      .collection('foodlog')
      .doc(email + '-foodlog-' + date)
      .get()
      .then((result) => {
        let data = Object.values(result.data());
        setFoodArr([...data]);
        setIsLoading(false);
      });
    let totalCals = 0;
    for (let i = 0; i < foodArr.length; i++) {
      totalCals += foodArr[i].calories;
    }
    db.collection('users')
      .doc(email)
      .collection('cals_step_log')
      .doc(date)
      .set(
        {
          cals_consumed: { totalCalories: Math.round(totalCals) },
        },
        { merge: true }
      )
      .then(() => {
        setIsLoading(false);
        console.log('written to the db');
      });
  }

  return (
    <View>
      {isLoading ? (
        <Text>Food Log ...</Text>
      ) : (
        foodArr.map((food) => {
          return <FoodCard food={food} setIsLoading={setIsLoading} />;
        })
      )}
    </View>
  );
}
