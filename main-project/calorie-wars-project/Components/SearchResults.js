import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase';
import formatDate from '../Utils/formatDate';

const SearchResults = ({ searchResults, setIsLoading }) => {
  //console.log('inside search results');

  const resultsObj = {
    name: searchResults[0].name,
    calories: searchResults[0].calories,
    serving_size_g: searchResults[0].serving_size_g,
  };

  const handleAdd = () => {
    const date = formatDate();
    const dbRef = db.collection('users').doc(auth.currentUser?.email);
    const email = auth.currentUser?.email;

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
                let cals = Math.round(cals_consumed);
                dbRef
                  .collection('cals_step_log')
                  .doc(date)
                  .set(
                    {
                      cals_consumed: (isNaN(cals) ? 0 : cals) + Number(resultsObj.calories),
                    },
                    { merge: true }
                  )
                  .catch((err) => console.log(err));
                dbRef
                  .collection('leaderboard')
                  .doc(email + '-leaderboard')
                  .set(
                    {
                      cals_consumed: (isNaN(cals) ? 0 : cals) + Number(resultsObj.calories),
                    },
                    { merge: true }
                  )
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.searchResultsContainer}>
      <Text style={styles.textElems}> -- search result -- </Text>
      <Text style={{ ...styles.textElems, fontSize: 20 }}>
        {resultsObj.name[0].toUpperCase() + resultsObj.name.slice(1)}
      </Text>
      <Text style={styles.textElems}> {resultsObj.calories} kcal</Text>
      <Text style={styles.textElems}> {resultsObj.serving_size_g} (g)</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textElems: { textAlign: 'center', margin: 3 },
  searchResultsContainer: {
    backgroundColor: 'lightgrey',
    marginTop: 5,
    paddingTop: 5,
    borderColor: '#DA1E37',
    borderWidth: 1,
    borderRadius: 10,
    paddingBottom: 0,
    borderColor: '#2B2D42',
  },
  addButton: {
    backgroundColor: '#DA1E37',
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
  addButtonText: {
    color: 'white',
  },
});

export default SearchResults;
