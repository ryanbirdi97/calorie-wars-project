import React from 'react';
import { View, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

export default function Home() {
  return (
    <PaperProvider>
      <View>
        <Text>Home</Text>
      </View>
    </PaperProvider>
  );
}
