import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { db, auth } from '../firebase';
import formatDate from '../Utils/formatDate';

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const date = formatDate(); // 16-08-2022
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [page, setPage] = useState('Login');

  const navigation = useNavigation();
  const batch = db.batch();

  console.disableYellowBox = true;

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

        const newFoodLog = db.collection('users').doc(email).collection('foodlog').doc(date);

        batch.set(newFoodLog, {});

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
    <SafeAreaView style={styles.safeareaview}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : ''}
        style={styles.fullContainer}
      >
        <View style={styles.container}>
          <Image source={require('../assets/calorie_wars_logo.png')} style={styles.logo} />

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
              style={styles.inputBox}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.inputBox}
              secureTextEntry
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.registerButton]}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    justifyContent: 'center',
  },
  fullContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    flex: 0.3,
    width: '90%',
    height: undefined,
    marginTop: 15,
    resizeMode: 'contain',
  },
  inputContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '80%',
  },
  inputBox: {
    backgroundColor: '#EDF2F4',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#2B2D42',
    borderWidth: 1,
    marginTop: 7,
  },
  buttonContainer: {
    flex: 0.35,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#DA1E37',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderColor: '#2B2D42',
    borderWidth: 1,
  },
  registerButton: {
    alignItems: 'center',
    backgroundColor: '#8D99AE',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    borderColor: '#2B2D42',
    borderWidth: 1,
  },
  loginButtonText: {
    color: '#2B2D42',
    fontWeight: '700',
    fontSize: 16,
  },
  registerButtonText: {
    color: '#2B2D42',
    fontWeight: '700',
    fontSize: 16,
  },
});
