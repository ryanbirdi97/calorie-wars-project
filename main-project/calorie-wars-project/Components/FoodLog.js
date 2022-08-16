import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';

import FoodCard from './FoodCard';
import formatDate from '../Utils/formatDate';

export default function FoodLog({ isLoading, setIsLoading }) {
  const [foodArr, setFoodArr] = useState([]);

  if (isLoading) {
    const date = formatDate(); // 16-08-2022

    const email = auth.currentUser?.email;
    db.collection('users')
      .doc(email)
      .collection('foodlog')
      .doc(date)
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
          cals_consumed: Math.round(totalCals),
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
          return (
            <FoodCard
              key={Math.round(Math.random() * 1000)}
              food={food}
              setIsLoading={setIsLoading}
            />
          );
        })
      )}
    </View>
  );
}
