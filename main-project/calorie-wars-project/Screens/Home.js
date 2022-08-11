import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import SearchByText from '../Components/SearchByText';

import ScanBarcode from '../Components/ScanBarcode';

export default function Home() {
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <SearchByText />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowBarcodeScanner(showBarcodeScanner ? false : true);
          }}
        >
          <Text style={styles.buttonText}>
            {showBarcodeScanner ? 'hide' : 'show'} barcode scanner
          </Text>
        </TouchableOpacity>
        {showBarcodeScanner ? <ScanBarcode /> : <></>}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 70 },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
