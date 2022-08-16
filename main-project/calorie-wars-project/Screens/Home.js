import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import SearchByText from '../Components/SearchByText';

import ScanBarcode from '../Components/ScanBarcode';
import FoodLog from '../Components/FoodLog';
import AddCustomFood from '../Components/AddCustomFood';
import PedometerComp from '../Components/PedometerComp';
import ProgressTracker from '../Components/ProgressTracker';

export default function Home() {
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [productNameFromBarcode, setProductNameFromBarcode] = useState('');
  const [notFoundFromBarcodeApi, setNotFoundFromBarcodeApi] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchByText
          productNameFromBarcode={productNameFromBarcode}
          notFoundFromBarcodeApi={notFoundFromBarcodeApi}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <AddCustomFood />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowBarcodeScanner(showBarcodeScanner ? false : true);
          }}
        >
          {
            <Text style={styles.buttonText}>
              {showBarcodeScanner ? 'hide' : 'show'} barcode scanner
            </Text>
          }
        </TouchableOpacity>
        {showBarcodeScanner ? (
          <ScanBarcode
            setShowBarcodeScanner={setShowBarcodeScanner}
            setProductNameFromBarcode={setProductNameFromBarcode}
            setNotFoundFromBarcodeApi={setNotFoundFromBarcodeApi}
          />
        ) : (
          <FoodLog isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
      </View>
      <View style={styles.pedometer}>
        <PedometerComp setIsLoading={setIsLoading} />
      </View>
      <ProgressTracker isLoading={isLoading} setIsLoading={setIsLoading} />
    </ScrollView>
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
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  pedometer: {},
});
