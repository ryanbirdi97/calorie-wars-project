import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { searchProductByBarcode } from '../barcodeLookupAPI';

export default function ScanBarcode({
  setShowBarcodeScanner,
  setProductNameFromBarcode,
  setNotFoundFromBarcodeApi,
}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [product_name, setProduct_name] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setShowBarcodeScanner(false);
    searchProductByBarcode(data, setNotFoundFromBarcodeApi)
      .then(({ product_name }) => {
        setProduct_name(product_name);
        setProductNameFromBarcode(product_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setShowBarcodeScanner(false);
        }}
        style={styles.closeButton}
      >
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.barcode}
        />
      </View>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 70,
  },
  barcode: { height: 400, width: 400 },
  barcodeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 400,
    overflow: 'hidden',
    borderRadius: 30,
    position: 'absolute',
    top: -50,
  },
  closeButton: {
    backgroundColor: '#DA1E37',
    width: 300,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: '700', fontSize: 16 },
});
