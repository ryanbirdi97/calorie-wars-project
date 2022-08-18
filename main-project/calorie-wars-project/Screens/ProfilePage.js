import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';

import { Text, TouchableOpacity, View, Image, StyleSheet, TextInput, Alert } from 'react-native';
import { db, auth } from '../firebase';
import { Provider as PaperProvider } from 'react-native-paper';
import { useState } from 'react';

export default function ProfilePage() {
  const navigation = useNavigation();

  const [username, setUsername] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [stepGoal, setStepGoal] = useState(0);
  const [imageUri, setImageUri] = useState(null);

  const email = auth.currentUser?.email;
  var getUserEmail = db.collection('users').doc(email);

  useEffect(() => {
    getUserEmail
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUsername(doc.data().username);
          setImageUri(doc.data().avatar);
        } else {
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
          setCalorieGoal(doc.data().calorie_goal);
          setStepGoal(doc.data().step_goal);
        } else {
          console.log('No such document!');
        }
      });
  }, []);

  const handleSubmit = () => {
    if (username !== '' && calorieGoal > 0 && stepGoal > 0 && imageUri !== '') {
      getUserEmail
        .update({
          username: username,
        })
        .then(() => {
          console.log('Updated username in users successfully!');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });

      getUserEmail
        .collection('leaderboard')
        .doc(email + '-leaderboard')
        .update({
          username: username,
        })
        .then(() => {
          console.log('username updated in leaderboard');
        })
        .catch((err) => {
          console.log(err);
        });

      getUserEmail
        .collection('goals')
        .doc(email + '-goals')
        .update({
          calorie_goal: Number(calorieGoal),
        })
        .then(() => {
          console.log('Document successfully updated!');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });

      getUserEmail
        .collection('leaderboard')
        .doc(email + '-leaderboard')
        .update({
          calorie_goal: Number(calorieGoal),
        })
        .then(() => {
          console.log('calorie_goal updated in leaderboard');
        })
        .catch((err) => {
          console.log(err);
        });

      getUserEmail
        .collection('goals')
        .doc(email + '-goals')
        .update({
          step_goal: Number(stepGoal),
        })
        .then(() => {
          console.log('Document successfully updated!');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });

      getUserEmail
        .collection('leaderboard')
        .doc(email + '-leaderboard')
        .update({
          step_goal: Number(stepGoal),
        })
        .then(() => {
          console.log('step_goal updated in leaderboard');
        })
        .catch((err) => {
          console.log(err);
        });

      getUserEmail
        .update({ avatar: imageUri })
        .then(() => {
          console.log('Updated username in users successfully!');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });

      navigation.navigate('Home');
    } else if (calorieGoal < 1 || stepGoal < 1) {
      alert('Calorie Goal and steps goal should be of type number and cannot be less than 1');
    } else {
      alert('Please enter details!');
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
          console.log('password updated success!!');
          setNewPassword('');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Enter Password to update!!');
    }
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
    <View style={styles.pageContainer}>
      <View>
        <Text style={styles.updateProfile}>Email: {email}</Text>
      </View>

      <View style={styles.password}>
        <TextInput
          placeholder="New Password"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          style={styles.inputPassword}
          secureTextEntry
        />

        <TouchableOpacity onPress={handlePassword} style={styles.passwordButton}>
          <Text style={styles.passwordButtonText}>Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.Avatar}>
        <TouchableOpacity
          onPress={() => {
            setImageUri(
              'https://cn.i.cdn.ti-platform.com/content/2167/we-baby-bears/showpage/fr/webabybears-icon.8db091e9.8db091e9.png'
            );
            getUserEmail
              .update({
                avatar:
                  'https://cn.i.cdn.ti-platform.com/content/2167/we-baby-bears/showpage/fr/webabybears-icon.8db091e9.8db091e9.png',
              })
              .then(() => {
                console.log('Document successfully updated!');
              })
              .catch((error) => {
                console.error('Error updating document: ', error);
              });
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

            getUserEmail
              .update({
                avatar:
                  'https://media.istockphoto.com/vectors/panda-in-welcoming-gesture-vector-id531507581?k=20&m=531507581&s=612x612&w=0&h=tfI8JVXgRzZDXq9mZBcltma2qE6UllK4q702bSKzljo=',
              })
              .then(() => {
                console.log('Document successfully updated!');
              })
              .catch((error) => {
                console.error('Error updating document: ', error);
              });
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
            getUserEmail
              .update({
                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/11/44/penguin-158551__340.png',
              })
              .then(() => {
                console.log('Document successfully updated!');
              })
              .catch((error) => {
                console.error('Error updating document: ', error);
              });
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
            getUserEmail
              .update({
                avatar:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUbyFsE5kJewme6YK54wS22BydCrT8P-kS4z1ToAl1&s',
              })
              .then(() => {
                console.log('Document successfully updated!');
              })
              .catch((error) => {
                console.error('Error updating document: ', error);
              });
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
            getUserEmail
              .update({
                avatar:
                  'https://st2.depositphotos.com/1793519/5479/i/600/depositphotos_54794153-stock-photo-girl-holding-pink-heart.jpg',
              })
              .then(() => {
                console.log('Document successfully updated!');
              })
              .catch((error) => {
                console.error('Error updating document: ', error);
              });
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

      <View style={styles.userContainer}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.avatarstyling}
        />
        <Text style={styles.messagetext}>Paste an avatar url or select from the above images</Text>

        <View style={styles.textstyle}>
          <Text style={styles.label}>Avatar:</Text>

          <TextInput
            placeholder="New Avatar"
            value={imageUri}
            onChangeText={(text) => {
              setImageUri(text);
            }}
            style={styles.input}
          />
        </View>

        <View style={styles.textstyle}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            placeholder="Name"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.dataContainer}>
        <View style={styles.textstyle}>
          <Text style={styles.label}>Calorie Goal:</Text>

          <TextInput
            placeholder="Set-Calorie-Goals"
            value={String(calorieGoal)}
            onChangeText={(text) => setCalorieGoal(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.textstyle}>
          <Text style={styles.label}>Step Goal:</Text>

          <TextInput
            placeholder="Set-Step-Goals"
            value={String(stepGoal)}
            onChangeText={(text) => setStepGoal(text)}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'About Calorie Wars',
              '\nWelcome to Calorie Wars!\nAn app where you can compete with your friends to reach your calorie goals.\nEarn points by being as close to your food calories goal as possible - Not above or below.\nEarn points by smashing your steps goal - The more steps the better',
              [
                {
                  text: 'Back to Profile Page',
                  style: 'cancel',
                },
              ],
              { cancelable: false }
            )
          }
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignOut} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  userContainer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dataContainer: {
    flex: 4.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagetext: { marginTop: 10 },
  updateProfile: {
    textAlign: 'center',
    marginTop: 45,
  },
  input: {
    flex: 3,
    backgroundColor: '#EDF2F4',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: '#2B2D42',
    borderWidth: 1,
    marginTop: 15,
    height: 32,
    width: '40%',
    marginRight: 15,
    fontSize: 16,
  },
  label: {
    flex: 1,
    marginTop: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginRight: 15,
    marginLeft: 15,
  },
  emailAlign: { textAlign: 'center', marginBottom: 5 },
  Avatar: {
    flex: 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarstyling: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#2B2D42',
    borderWidth: 1,
  },
  textstyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  password: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputPassword: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDF2F4',
    borderColor: '#2B2D42',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
    height: 32,
    width: '40%',
    marginRight: 15,
    marginLeft: 10,
    fontSize: 16,
  },
  passwordButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8D99AE',
    padding: 7,
    margin: 10,
    borderRadius: 10,
    borderColor: '#2B2D42',
    borderWidth: 1,
  },
  passwordButtonText: {
    color: '#2B2D42',
    fontWeight: '700',
    fontSize: 14,
  },
  buttonContainer: {
    flex: 3.5,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#DA1E37',
    width: '30%',
    padding: 10,
    borderRadius: 10,
    borderColor: '#2B2D42',
    borderWidth: 1,
  },
  loginButtonText: {
    color: '#2B2D42',
    fontWeight: '700',
    fontSize: 16,
  },
});
