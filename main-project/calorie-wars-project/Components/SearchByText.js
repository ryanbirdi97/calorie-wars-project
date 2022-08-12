import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SearchBar,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { searchProductByText } from '../textLookupAPI';
import SearchResults from './SearchResults';

const SearchByText = ({ productNameFromBarcode, notFoundFromBarcodeApi }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [weight, setWeight] = useState('100');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchTerm(productNameFromBarcode);
  }, [productNameFromBarcode]);

  const handleSearch = () => {
    searchProductByText(weight + 'g ' + searchTerm).then((data) => {
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
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {searchResults.length >= 1 ? <SearchResults searchResults={searchResults} /> : <></>}
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
  weightInputField: { flexDirection: 'row', margin: 6 },
  gText: { fontSize: 30, margin: 10 },
});

export default SearchByText;
