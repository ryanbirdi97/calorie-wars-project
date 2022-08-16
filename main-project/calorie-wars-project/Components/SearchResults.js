import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase';
import formatDate from '../Utils/formatDate';

const SearchResults = ({ searchResults, setIsLoading }) => {
  console.log('inside search results');

  const resultsObj = {
    name: searchResults[0].name,
    calories: searchResults[0].calories,
    serving_size_g: searchResults[0].serving_size_g,
  };

  const handleAdd = () => {
    const date = formatDate();
    const dbRef = db.collection('users').doc(auth.currentUser?.email);

    dbRef
      .collection('foodlog')
      .doc(date)
      .get()
      .then((doc) => {
        dbRef
          .collection('foodlog')
          .doc(date)
          .set(
            {
              [resultsObj.name]: {
                name: resultsObj.name,
                grams: resultsObj.serving_size_g,
                calories: resultsObj.calories,
              },
            },
            { merge: true }
          )
          .then(() => {
            console.log('written to db (inside searchResults.js)');
            setIsLoading(true);

            // adding to the cal count of current day
            dbRef
              .collection('cals_step_log')
              .doc(date)
              .get()
              .then((result) => {
                const { cals_consumed } = result.data();
                dbRef
                  .collection('cals_step_log')
                  .doc(date)
                  .set({ cals_consumed: cals_consumed + resultsObj.calories });
              });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.searchResultsContainer}>
      <Text> Search Results View </Text>
      <Text> Name: {resultsObj.name}</Text>
      <Text> Calories: {resultsObj.calories}</Text>
      <Text> Serving Size (g): {resultsObj.serving_size_g}</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchResultsContainer: {
    backgroundColor: 'lightgrey',
    marginTop: 5,
    padding: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
    paddingBottom: 0,
  },
  addButton: {
    backgroundColor: '#0782F9',
    color: 'white',
    textAlign: 'center',
    width: '20%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderRadius: 40,
    bottom: 60,
    left: 250,
  },
});

export default SearchResults;
