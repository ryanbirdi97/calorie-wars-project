import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { db, auth } from '../firebase';

import FoodCard from './FoodCard';

export default function FoodLog() {
  const [foodArr, setFoodArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePress = () => {
    setIsLoading(true);
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
  };

  return (
    <View>
      <Text>FoodLog</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Refresh</Text>
      </TouchableOpacity>
      {isLoading ? <Text>Loading ...</Text> : <></>}
      {isLoading
        ? handlePress
        : foodArr.map((food) => {
            return <FoodCard food={food} />;
          })}
    </View>
  );
}
