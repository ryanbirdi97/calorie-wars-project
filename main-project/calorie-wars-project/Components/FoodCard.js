import { Text, View, StyleSheet, Button } from 'react-native';
import { db, auth } from '../firebase';
import firebase from 'firebase';
import 'firebase/firestore';
import formatDate from '../Utils/formatDate';

export default function FoodCard({ food, setIsLoading, fromLog = false }) {
  console.log('inside food card');

  const handleDelete = (food) => {
    const date = formatDate(); // 16-08-2022
    const email = auth.currentUser?.email;
    console.log(food);

    db.collection('users')
      .doc(email)
      .collection('foodlog')
      .doc(date)
      .update({ [food.name]: firebase.firestore.FieldValue.delete() })
      .then(() => {
        console.log('Item Deleted!');
        setIsLoading(true);
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
      <Text>{capitalizeFirstLetter(food.name)}</Text>
      <Text>Amount: {food.grams}g</Text>
      <Text>Calories: {Math.round(food.calories)}</Text>
      {fromLog ? (
        <></>
      ) : (
        <Button
          title="Delete"
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
    borderColor: 'black',
    padding: 10,
    alignItems: 'center',
    direction: 'row',
  },
});
