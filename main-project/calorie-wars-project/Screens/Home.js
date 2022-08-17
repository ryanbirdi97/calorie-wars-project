import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import SearchByText from '../Components/SearchByText';

import ScanBarcode from '../Components/ScanBarcode';
import FoodLog from '../Components/FoodLog';
import AddCustomFood from '../Components/AddCustomFood';
import PedometerComp from '../Components/PedometerComp';
import ProgressTracker from '../Components/ProgressTracker';

export default function Home() {
  //console.log('inside home');

  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [productNameFromBarcode, setProductNameFromBarcode] = useState('');
  const [notFoundFromBarcodeApi, setNotFoundFromBarcodeApi] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.searchByText}>
          <SearchByText
            productNameFromBarcode={productNameFromBarcode}
            setIsLoading={setIsLoading}
          />
        </View>
        <AddCustomFood setIsLoading={setIsLoading} />
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={showBarcodeScanner}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ScanBarcode
                  setShowBarcodeScanner={setShowBarcodeScanner}
                  setProductNameFromBarcode={setProductNameFromBarcode}
                  setNotFoundFromBarcodeApi={setNotFoundFromBarcodeApi}
                />
              </View>
            </View>
          </Modal>
        ) : (
          <FoodLog isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
      </View>
      <View style={styles.pedometer}>
        <PedometerComp />
      </View>
      <ProgressTracker />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 70 },
  button: {
    alignItems: 'center',
    backgroundColor: '#DA1E37',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderColor: '#2B2D42',
    borderWidth: 1,
    margin: 10,
    right: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  barcodeView: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'red',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
