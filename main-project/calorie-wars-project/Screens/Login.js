import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { db, auth } from '../firebase';
import formatDate from '../Utils/formatDate';

import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image } from 'react-native';

export default function Login() {
  const date = formatDate(); // 16-08-2022
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [page, setPage] = useState('Login');

  const navigation = useNavigation();
  const batch = db.batch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(page);
        navigation.navigate(page);
      }
    });

    return unsubscribe;
  }, [page]);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const newUsername = db.collection('users').doc(email);

        batch.set(newUsername, {
          username: '',
          avatar:
            'https://freepikpsd.com/file/2019/10/silhouette-icon-blank-person-template-blank-person-png-900_900-1.jpg',
        });

        const newLeaderboard = db
          .collection('users')
          .doc(email)
          .collection('leaderboard')
          .doc(email + '-leaderboard');

        batch.set(newLeaderboard, {
          calorie_goal: 0,
          cals_consumed: 0,
          date: firebase.firestore.Timestamp.now(),
          score: 0,
          step_goal: 0,
          steps: 0,
          username: '',
        });

        const newGoals = db
          .collection('users')
          .doc(email)
          .collection('goals')
          .doc(email + '-goals');

        batch.set(newGoals, {
          calorie_goal: 0,
          step_goal: 0,
        });

        const newCalsStepGoal = db
          .collection('users')
          .doc(email)
          .collection('cals_step_log')
          .doc(date);

        batch.set(newCalsStepGoal, {
          cals_consumed: 0,
          steps: 0,
        });

        batch
          .commit()
          .then(() => {
            console.log('New user database Created!!');
          })
          .catch((err) => {
            console.log(err);
          });

        const user = userCredentials.user;
        setPage('ProfilePage');
        navigation.navigate('MainTabs');
        console.log('Registered with:', user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        setPage('MainTabs');
        navigation.navigate('MainTabs');
        console.log('Logged in with:', user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container} behavior="padding">
      <Image source={require('../assets/calorie_wars_logo.png')} style={styles.logo} />
      <Text style={styles.heading}>
        Welcome to calorie Wars!{'\n'}An app where you can compete with your friends to reach your
        calorie goals.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    width: '80%',
  },
  logo: {
    flex: 1,
    width: '90%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    flex: 1,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 40,
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
  heading: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    //marginTop: 40,
    padding: 15,
    color: 'black',
    //borderWidth: 2,
    borderRadius: 25,
    //borderColor: 'green',
    //backgroundColor: '#f1faee',
    marginBottom: 15,
  },
});
