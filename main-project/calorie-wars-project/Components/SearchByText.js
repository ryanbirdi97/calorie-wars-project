import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SearchBar, TextInput, Pressable } from 'react-native';
import { searchProductByText } from '../textLookupAPI';
import SearchResults from './SearchResults';
const SearchByText = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState('');

  useEffect(() => {
    console.log('search term change');
  }, [searchTerm]);

  const handleSubmit = () => {
    searchProductByText(searchTerm).then((data) => {
      setSearchResults(data);
    });
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          style={styles.input}
        />
        <Pressable onPress={handleSubmit}>
          <Text style={styles.submitButton}>Submit</Text>
        </Pressable>
      </View>
      <SearchResults searchResults={searchResults} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderRadius: 40,
  },
});

export default SearchByText;
