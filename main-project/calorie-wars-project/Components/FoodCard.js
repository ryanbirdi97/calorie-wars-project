import { Text, View, StyleSheet, Button } from 'react-native';
import { db, auth } from '../firebase';
import firebase from 'firebase';
import 'firebase/firestore';

export default function FoodCard({ food, setIsLoading }) {
  const handleDelete = (food) => {
    const date = new Date().toLocaleDateString('en-US').replace(/\//gi, '-');
    const email = auth.currentUser?.email;
    console.log(food);

    db.collection('users')
      .doc(email)
      .collection('foodlog')
      .doc(email + '-foodlog-' + date)
      .update({ [food.name]: firebase.firestore.FieldValue.delete() })
      .then(() => {
        console.log('Item Deleted!');
        setIsLoading(true);
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
      <Button
        title="Delete"
        onPress={() => {
          handleDelete(food);
        }}
      />
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
