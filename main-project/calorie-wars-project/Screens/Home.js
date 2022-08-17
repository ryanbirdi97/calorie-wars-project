import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
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

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.box}>
          <SearchByText
            productNameFromBarcode={productNameFromBarcode}
            setIsLoading={setIsLoading}
          />
        </View>
        <TouchableOpacity
          style={styles.barcodeButton}
          onPress={() => {
            setShowBarcodeScanner(showBarcodeScanner ? false : true);
          }}
        >
          <Image
            source={require('../assets/barcode_icon.png')}
            resizeMode="contain"
            style={{
              width: 60,
              height: 60,
            }}
          />
        </TouchableOpacity>
        <View style={styles.box}>
          <AddCustomFood setIsLoading={setIsLoading} />
        </View>
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
      <PedometerComp />
      <View style={styles.box}>
        <ProgressTracker />
      </View>
    </ScrollView>
  );
}

// bg color -> 100% anti flash white #F2F2F2

const styles = StyleSheet.create({
  container: { paddingTop: 50, padding: 20, backgroundColor: '#FFF' },
  box: { backgroundColor: '#F2F2F2', borderRadius: 10, padding: 15, marginBottom: 10 },
  button: {
    alignItems: 'center',
    backgroundColor: '#DA1E37', // red -> 97% crimson
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderColor: '#2B2D42', // brownish red
    borderWidth: 1,
    margin: 10,
    right: 10,
  },
  barcodeButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 200,
    borderColor: '#2B2D42', // brownish red
    borderWidth: 1,
    width: '25%',
    left: 240,
    bottom: 5,
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
