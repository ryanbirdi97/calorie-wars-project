import { View, Button, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { db, auth } from '../firebase';
import formatDate from '../Utils/formatDate';

export default function AddCustomFood({ setIsLoading }) {
  const [food, setFood] = useState('');
  const [amount, setAmount] = useState(undefined);
  const [calories, setCalories] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [err, setErr] = useState(false);

  function handleSubmit() {
    const date = formatDate(); // 16-08-2022
    const email = auth.currentUser?.email;
    const dbRef = db.collection('users').doc(auth.currentUser?.email);

    if (
      (food.length > 1 && typeof food === 'string') ||
      typeof amount === 'number' ||
      typeof calories === 'number'
    ) {
      dbRef
        .collection('foodlog')
        .doc(date)
        .get()
        .then(() => {
          dbRef
            .collection('foodlog')
            .doc(date)
            .set(
              {
                [food]: {
                  name: food,
                  grams: Number(amount),
                  calories: Number(calories),
                },
              },
              { merge: true }
            )
            .then(() => {
              console.log('written to db (inside AddCustomFood.js)');
              dbRef
                .collection('cals_step_log')
                .doc(date)
                .get()
                .then((result) => {
                  const { cals_consumed } = result.data();
                  dbRef
                    .collection('cals_step_log')
                    .doc(date)
                    .set(
                      {
                        cals_consumed:
                          (isNaN(+cals_consumed) ? 0 : +cals_consumed) + Number(calories),
                      },
                      { merge: true }
                    )
                    .catch((err) => {
                      console.log(err);
                    });

                  dbRef
                    .collection('leaderboard')
                    .doc(email + '-leaderboard')
                    .set(
                      {
                        cals_consumed:
                          (isNaN(+cals_consumed) ? 0 : +cals_consumed) + Number(calories),
                      },
                      { merge: true }
                    )
                    .catch((err) => {
                      console.log(err);
                    });

                  setFood('');
                  setAmount(undefined);
                  setCalories(undefined);
                  setIsLoading(true);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErr(true);
    }
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
      >
        {isOpen ? (
          <Text style={styles.buttonText}>Close</Text>
        ) : (
          <Text style={styles.buttonText}>Add Custom</Text>
        )}
      </TouchableOpacity>
      {isOpen ? (
        <View>
          <Text>Food: </Text>
          <TextInput
            style={styles.input}
            value={food}
            onChangeText={(text) => {
              setFood(text);
            }}
          ></TextInput>
          <Text>Amount(g): </Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(text) => {
              setAmount(text);
            }}
          ></TextInput>
          <Text>Calories: </Text>
          <TextInput
            style={styles.input}
            value={calories}
            onChangeText={(text) => {
              setCalories(text);
            }}
          ></TextInput>
          {err ? <Text style={styles.errMsg}>Please comlpete form</Text> : <></>}
          <Button
            title="Submit"
            onPress={() => {
              handleSubmit();
            }}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  errMsg: {
    color: 'red',
    fontWeight: 'bold',
  },
});
