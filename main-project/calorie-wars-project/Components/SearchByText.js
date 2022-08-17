import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { searchProductByText } from '../textLookupAPI';
import SearchResults from './SearchResults';

const SearchByText = ({ productNameFromBarcode, setIsLoading }) => {
  //console.log('inside search by text');

  const [searchTerm, setSearchTerm] = useState('');
  const [weight, setWeight] = useState('100');
  const [searchResults, setSearchResults] = useState([]);

  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchPressed, setSearchPressed] = useState(false);

  useEffect(() => {
    setSearchTerm(productNameFromBarcode);
  }, [productNameFromBarcode]);

  const handleSearch = () => {
    setHasLoaded(false);
    setSearchPressed(true);
    searchProductByText(weight + 'g ' + searchTerm)
      .then((data) => {
        setSearchResults(data);
        setHasLoaded(true);
        setSearchPressed(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Search..."
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            style={styles.input}
          />
          <View style={styles.weightInputField}>
            <TextInput
              placeholder={'weight'}
              value={weight}
              onChangeText={(text) => {
                setWeight(text);
              }}
              style={styles.input}
            />
            <Text style={styles.gText}>g</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <Text>{hasLoaded || !searchPressed ? <></> : 'loading...'}</Text>
      </View>
      {searchResults.length >= 1 ? (
        <SearchResults searchResults={searchResults} setIsLoading={setIsLoading} />
      ) : (
        <Text>{hasLoaded ? 'not found' : <></>}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
  },
  inputBox: { flexDirection: 'row' },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: '90%',
  },
  weightInputField: { flexDirection: 'row', width: '30%', paddingLeft: 5 },
  gText: { fontSize: 30, marginLeft: 8 },

  button: {
    alignItems: 'center',
    backgroundColor: '#DA1E37',
    width: '125%',
    padding: 15,
    borderRadius: 10,
    borderColor: '#2B2D42',
    borderWidth: 1,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default SearchByText;
