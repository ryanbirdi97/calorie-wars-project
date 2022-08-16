import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SelectList from 'react-native-dropdown-select-list';
import FoodCard from '../Components/FoodCard';
import { db, auth } from '../firebase';

export default Log = () => {
  const [selected, setSelected] = React.useState('');
  const [foodArr, setFoodArr] = useState([]);
  const [cals, setCals] = useState('');
  const [steps, setSteps] = useState('');
  const data = [];

  const past7Days = [...Array(7).keys()].map((index) => {
    let date = new Date();
    date.setDate(date.getDate() - index);
    date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    date = date.split('-');
    const nDate = date.map((elem) => {
      if (elem.length === 1) {
        elem = '0' + elem;
      }
      return elem;
    });
    return nDate.join('-');
  });

  for (let i = 0; i < past7Days.length; i++) {
    data.push({ key: past7Days[i], value: past7Days[i] });
  }

  function handleSelect() {
    setFoodArr([]);
    const email = auth.currentUser?.email;
    db.collection('users')
      .doc(email)
      .collection('foodlog')
      .doc(email + '-foodlog-' + selected)
      .get()
      .then((result) => {
        let data = Object.values(result.data());
        setFoodArr([...data]);
      });

    db.collection('users')
      .doc(email)
      .collection('cals_step_log')
      .doc(selected)
      .get()
      .then((result) => {
        let data = Object.values(result.data());

        setCals(data[0].totalCalories);
        setSteps(data[1].totalSteps);
      });
  }

  return (
    <View style={styles.container}>
      <Text>Log</Text>
      <SelectList
        setSelected={setSelected}
        data={data}
        onSelect={() => {
          handleSelect();
        }}
      />
      <View>
        {foodArr.map((food) => {
          return <FoodCard key={Math.round(Math.random() * 1000)} food={food} fromLog={true} />;
        })}
      </View>
      <View>
        <Text>Kcal: {cals}</Text>
        <Text>Steps: {steps}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 70 },
});
