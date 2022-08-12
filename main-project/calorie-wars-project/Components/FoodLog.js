import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { db, auth } from '../firebase';

import FoodCard from './FoodCard';

export default function FoodLog() {
  const [foodArr, setFoodArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  }

  return (
    <View>
      <Text>FoodLog</Text>
      {isLoading ? (
        <Text>Loading ...</Text>
      ) : (
        foodArr.map((food) => {
          return <FoodCard food={food} />;
        })
      )}
    </View>
  );
}
