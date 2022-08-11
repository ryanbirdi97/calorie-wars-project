import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { db, auth } from '../firebase';
import { Provider as PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import firebase from 'firebase';

export default function ProfilePage() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [stepGoal, setStepGoal] = useState(0);
  const [imageUri, setImageUri] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/2048px-OOjs_UI_icon_userAvatar.svg.png'
  );

  // const user = firebase.auth().currentUser;
  // console.log(user.email, '<-----');
  useEffect(() => {
    const email = auth.currentUser?.email;
    var getUserEmail = db.collection('users').doc(auth.currentUser?.email);

    getUserEmail
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data().username);
          setUsername(doc.data().username);
          setImageUri(doc.data().avatar);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });

    getUserEmail
      .collection('goals')
      .doc(email + '-goals')
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data().step_goal);
          setCalorieGoal(doc.data().calorie_goal);
          setStepGoal(doc.data().step_goal);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
  }, []);

  const handleSubmit = () => {
    // setPage('MainTabs');
    console.log(username);
    if (username !== '' && calorieGoal > 0 && stepGoal > 0) {
      navigation.navigate('Home');
    } else {
      alert('Please enter details!');
    }
  };

  const handleUsername = () => {
    if (username !== '') {
      // update username in database here....

      console.log('updateUsername in database');
    } else {
      alert('Enter username to update!!');
    }
  };

  const handlePassword = () => {
    if (newPassword.length < 6) {
      alert('Password should be at 6 characters!!');
    } else if (newPassword !== '' && newPassword.length > 5) {
      const user = auth.currentUser;

      user
        .updatePassword(newPassword)
        .then(() => {
          console.log('update success!!');
          setNewPassword('');
        })
        .catch((error) => {
          console.log(error);
          // An error occurred
        });
    } else {
      alert('Enter Password to update!!');
    }
  };

  const handleCalorieGoal = () => {
    if (calorieGoal > 0) {
      // update Password in database here....

      console.log('updatecalorieGoal in database');
    } else {
      alert('Calorie Goal should be of type number and cannot be less than 1');
    }
  };

  const handleStepGoal = () => {
    if (stepGoal > 0) {
      // update Password in database here....

      console.log('updateStepGoal in database');
    } else {
      alert('Step Goal should be a number and cannot be less than 1');
    }
  };

  // change it to useEffect, whenever user selects the avatar update uri
  // const handleImage = () => {
  //   console.log('updateimage uri');
  //   // setImageUri(???)
  // };

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
        <Text>Choose your Avatar:</Text>
      </View>
      <View style={styles.Avatar}>
        <TouchableOpacity
          onPress={() => {
            setImageUri(
              'https://cn.i.cdn.ti-platform.com/content/2167/we-baby-bears/showpage/fr/webabybears-icon.8db091e9.8db091e9.png'
            );
          }}
        >
          <Image
            source={{
              uri: 'https://cn.i.cdn.ti-platform.com/content/2167/we-baby-bears/showpage/fr/webabybears-icon.8db091e9.8db091e9.png',
            }}
            style={styles.avatarstyling}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setImageUri(
              'https://media.istockphoto.com/vectors/panda-in-welcoming-gesture-vector-id531507581?k=20&m=531507581&s=612x612&w=0&h=tfI8JVXgRzZDXq9mZBcltma2qE6UllK4q702bSKzljo='
            );
          }}
        >
          <Image
            source={{
              uri: 'https://media.istockphoto.com/vectors/panda-in-welcoming-gesture-vector-id531507581?k=20&m=531507581&s=612x612&w=0&h=tfI8JVXgRzZDXq9mZBcltma2qE6UllK4q702bSKzljo=',
            }}
            style={styles.avatarstyling}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setImageUri('https://cdn.pixabay.com/photo/2013/07/13/11/44/penguin-158551__340.png');
          }}
        >
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2013/07/13/11/44/penguin-158551__340.png',
            }}
            style={styles.avatarstyling}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setImageUri(
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUbyFsE5kJewme6YK54wS22BydCrT8P-kS4z1ToAl1&s'
            );
          }}
        >
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUbyFsE5kJewme6YK54wS22BydCrT8P-kS4z1ToAl1&s',
            }}
            style={styles.avatarstyling}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setImageUri(
              'https://st2.depositphotos.com/1793519/5479/i/600/depositphotos_54794153-stock-photo-girl-holding-pink-heart.jpg'
            );
          }}
        >
          <Image
            source={{
              uri: 'https://st2.depositphotos.com/1793519/5479/i/600/depositphotos_54794153-stock-photo-girl-holding-pink-heart.jpg',
            }}
            style={styles.avatarstyling}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.avatarstyling}
        />
        <Text>Email: {auth.currentUser?.email}</Text>
        <View style={styles.textstyle}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleUsername} style={styles.button}>
              <Text style={styles.buttonText}>Update Username</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textstyle}>
          <TextInput
            placeholder="New Password"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            style={styles.input}
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlePassword} style={styles.button}>
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textstyle}>
          <TextInput
            placeholder="Set-Calorie-Goals"
            value={String(calorieGoal)}
            onChangeText={(text) => setCalorieGoal(text)}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCalorieGoal} style={styles.button}>
              <Text style={styles.buttonText}>Set Calorie Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textstyle}>
          <TextInput
            placeholder="Set-Step-Goals"
            value={String(stepGoal)}
            onChangeText={(text) => setStepGoal(text)}
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleStepGoal} style={styles.button}>
              <Text style={styles.buttonText}>Set Step Goal</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 15,
    height: 32,
    width: '40%',

    fontSize: 16,
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '90%',
    padding: 8,
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
  Avatar: {
    flex: 5,
    flexDirection: 'row',
    marginLeft: 10,
  },
  avatarstyling: {
    width: 60,
    height: 60,
    margin: 5,
  },
  textstyle: {
    flex: 2,
    flexDirection: 'row',
  },
});
