import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const SearchResults = ({ searchResults }) => {
  console.log('searchResults: ', searchResults[0].name);
  const resultsObj = {
    name: searchResults[0].name,
    calories: searchResults[0].calories,
    serving_size_g: searchResults[0].serving_size_g,
  };

  return (
    <View style={styles.searchResultsContainer}>
      <Text> Search Results View </Text>
      <Text> Name: {resultsObj.name}</Text>
      <Text> Calories: {resultsObj.calories}</Text>
      <Text> Serving Size:: (g){resultsObj.serving_size_g}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  searchResultsContainer: {
    backgroundColor: 'grey',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
});

export default SearchResults;
