import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';

import { Text, TouchableOpacity, View, Image, StyleSheet, TextInput } from 'react-native';
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

  // const handleUsername = () => {
  //   console.log(email);
  //   if (username !== '') {
  //     getUserEmail
  //       .update({
  //         username: username,
  //       })
  //       .then(() => {
  //         console.log('Updated username in users successfully!');
  //       })
  //       .catch((error) => {
  //         console.error('Error updating document: ', error);
  //       });

  //     getUserEmail
  //       .collection('leaderboard')
  //       .doc(email + '-leaderboard')
  //       .update({
  //         username: username,
  //       })
  //       .then(() => {
  //         console.log('username updated in leaderboard');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     alert('Enter username to update!!');
  //   }
  // };

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

  // const handleCalorieGoal = () => {
  //   if (calorieGoal > 0) {
  //     getUserEmail
  //       .collection('goals')
  //       .doc(email + '-goals')
  //       .update({
  //         calorie_goal: Number(calorieGoal),
  //       })
  //       .then(() => {
  //         console.log('Document successfully updated!');
  //       })
  //       .catch((error) => {
  //         console.error('Error updating document: ', error);
  //       });

  //     getUserEmail
  //       .collection('leaderboard')
  //       .doc(email + '-leaderboard')
  //       .update({
  //         calorie_goal: Number(calorieGoal),
  //       })
  //       .then(() => {
  //         console.log('calorie_goal updated in leaderboard');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     alert('Calorie Goal should be of type number and cannot be less than 1');
  //   }
  // };

  // const handleStepGoal = () => {
  //   if (stepGoal > 0) {
  //     getUserEmail
  //       .collection('goals')
  //       .doc(email + '-goals')
  //       .update({
  //         step_goal: Number(stepGoal),
  //       })
  //       .then(() => {
  //         console.log('Document successfully updated!');
  //       })
  //       .catch((error) => {
  //         console.error('Error updating document: ', error);
  //       });

  //     getUserEmail
  //       .collection('leaderboard')
  //       .doc(email + '-leaderboard')
  //       .update({
  //         step_goal: Number(stepGoal),
  //       })
  //       .then(() => {
  //         console.log('step_goal updated in leaderboard');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     alert('Step Goal should be a number and cannot be less than 1');
  //   }
  // };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };
  // const updateAvatar = () => {
  //   getUserEmail
  //     .update({ avatar: imageUri })
  //     .then(() => {
  //       console.log('Updated username in users successfully!');
  //     })
  //     .catch((error) => {
  //       console.error('Error updating document: ', error);
  //     });
  // };

  return (
    <PaperProvider>
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlePassword} style={styles.button}>
            <Text style={styles.buttonText}>Password</Text>
          </TouchableOpacity>
        </View>
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

      <View style={styles.container}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.avatarstyling}
        />
        <Text style={styles.messagetext}>Enter your avatar url or select from above images.</Text>

        <View style={styles.textstyle}>
          <Text style={styles.label}>Avatar</Text>

          <TextInput
            placeholder="New Avatar"
            value={imageUri}
            onChangeText={(text) => {
              setImageUri(text);
            }}
            style={styles.input}
          />

          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={updateAvatar} style={styles.button}>
              <Text style={styles.buttonText}>New Avatar</Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={styles.textstyle}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Name"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
            style={styles.input}
          />

          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleUsername} style={styles.button}>
              <Text style={styles.buttonText}>Change Name</Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={styles.textstyle}>
          <Text style={styles.label}>Calorie Goal</Text>

          <TextInput
            placeholder="Set-Calorie-Goals"
            value={String(calorieGoal)}
            onChangeText={(text) => setCalorieGoal(text)}
            style={styles.input}
          />
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCalorieGoal} style={styles.button}>
              <Text style={styles.buttonText}>Calorie Goal</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={styles.textstyle}>
          <Text style={styles.label}>Step Goal</Text>

          <TextInput
            placeholder="Set-Step-Goals"
            value={String(stepGoal)}
            onChangeText={(text) => setStepGoal(text)}
            style={styles.input}
          />

          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleStepGoal} style={styles.button}>
              <Text style={styles.buttonText}>Steps Goal</Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Home</Text>
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
    marginBottom: 7,
  },
  messagetext: { marginTop: 10 },
  updateProfile: {
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 10,
    // fontSize: 25,
    // fontWeight: '700',
  },
  input: {
    flex: 3,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
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
    // fontSize: 14,
  },
  buttonContainer: {
    width: '36%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailAlign: { textAlign: 'center', marginBottom: 5 },
  button: {
    backgroundColor: '#0782F9',
    width: '90%',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
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
    borderRadius: '15%',
    borderWidth: 1,
    borderColor: 'grey',
  },
  textstyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  password: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  inputPassword: {
    flex: 3,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
    height: 32,
    width: '40%',
    marginRight: 15,
    fontSize: 16,
  },
  buttonPassword: {
    flex: 1,
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    backgroundColor: '#0782F9',
    width: '90%',
    borderRadius: 10,
    textAlign: 'center',
    height: 18,
  },
});
