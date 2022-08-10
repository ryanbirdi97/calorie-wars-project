import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { Provider as PaperProvider } from 'react-native-paper';

export default function ProfilePage() {
  const navigation = useNavigation();

  const handleSubmit = () => {
    // setPage('MainTabs');
    navigation.navigate('Home');
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <PaperProvider>
      <View>
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/2048px-OOjs_UI_icon_userAvatar.svg.png',
            }}
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text>Sign out</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
}

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
});
