import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase';
import firebase from 'firebase';

const SearchResults = ({ searchResults }) => {
  const resultsObj = {
    name: searchResults[0].name,
    calories: searchResults[0].calories,
    serving_size_g: searchResults[0].serving_size_g,
  };

  const handleAdd = () => {
    const date = new Date().toLocaleDateString().replace(/\//gi, '-'); // 08/11/22
    const email = auth.currentUser?.email;
    const dbRef = db.collection('users').doc(auth.currentUser?.email);

    dbRef
      .collection('foodlog')
      .doc(email + '-foodlog-' + date)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          dbRef
            .collection('foodlog')
            .doc(email + '-foodlog-' + date)
            .set({
              [resultsObj.name]: {
                grams: resultsObj.serving_size_g,
                calories: resultsObj.calories,
              },
            })
            .then(() => {
              console.log('written to db');
            });
        } else {
        }
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
