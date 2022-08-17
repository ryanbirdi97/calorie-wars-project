import { Text, View, StyleSheet, Button } from 'react-native';
import { db, auth } from '../firebase';
import firebase from 'firebase';
import 'firebase/firestore';
import formatDate from '../Utils/formatDate';

export default function FoodCard({ food, setIsLoading, fromLog = false }) {
  //console.log('inside food card');

  const handleDelete = (food) => {
    const date = formatDate(); // 16-08-2022
    const email = auth.currentUser?.email;

    db.collection('users')
      .doc(email)
      .collection('foodlog')
      .doc(date)
      .update({ [food.name]: firebase.firestore.FieldValue.delete() })
      .then(() => {
        console.log('Item Deleted!');
        // deleting the calories from curr calorie count
        db.collection('users')
          .doc(email)
          .collection('cals_step_log')
          .doc(date)
          .get()
          .then((result) => {
            const { cals_consumed } = result.data();

            console.log(cals_consumed, ' cals from handleDelete');
            db.collection('users')
              .doc(email)
              .collection('cals_step_log')
              .doc(date)
              .set({ cals_consumed: cals_consumed - food.calories });
            db.collection('users')
              .doc(email)
              .collection('leaderboard')
              .doc(email + '-leaderboard')
              .set({ cals_consumed: cals_consumed - food.calories });
            setIsLoading(true);
          });
      })
      .catch((err) => {
        console.log(err, ' from handleDelete promise rejection');
      });
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <View style={styles.foodCard}>
      <Text style={styles.foodName}>{capitalizeFirstLetter(food.name)}</Text>
      <Text>Amount: {food.grams}g</Text>
      <Text>Calories: {Math.round(food.calories)}</Text>
      {fromLog ? (
        <></>
      ) : (
        <Button
          title="Delete"
          color="#DA1E37"
          onPress={() => {
            handleDelete(food);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  foodCard: {
    backgroundColor: 'lightgrey',
    borderColor: '#DA1E37',
    borderWidth: 2,
    paddingTop: 10,
    paddingBottom: 6,
    alignItems: 'center',
    direction: 'row',
    borderRadius: 25,
    margin: 5,
  },
  foodName: {
    fontSize: 20,
    fontWeight: '500',
    paddingBottom: 5,
  },
});
