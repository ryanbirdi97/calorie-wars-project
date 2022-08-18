import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SelectList from 'react-native-dropdown-select-list';
import FoodCard from '../Components/FoodCard';
import { db, auth } from '../firebase';

export default Log = () => {
  const [selected, setSelected] = useState('');
  const [foodArr, setFoodArr] = useState([]);
  const [cals, setCals] = useState(0);
  const [steps, setSteps] = useState(0);
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
      .doc(selected)
      .get()
      .then((result) => {
        if (result.data() === undefined) {
          // nothing in log
          setFoodArr([]);
        } else {
          let data = Object.values(result.data());
          console.log(data);
          setFoodArr([...data]);
        }
      })
      .catch((err) => {
        console.log(err, ' << log.js promise rejection');
      });

    db.collection('users')
      .doc(email)
      .collection('cals_step_log')
      .doc(selected)
      .get()
      .then((result) => {
        let data = result.data();
        if (data === undefined) {
          setCals(0);
          setSteps(0);
        } else {
          let cals = Math.round(data.cals_consumed);
          setCals(cals);
          setSteps(data.steps);
        }
      })
      .catch((err) => {
        console.log(err, ' << log.js db req promise rejection');
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <SelectList
          setSelected={setSelected}
          data={data}
          onSelect={() => {
            handleSelect();
          }}
        />
      </View>
      <View>
        {foodArr.length === 0 ? (
          <Text style={styles.nothing}>Nothing logged on: {selected}</Text>
        ) : (
          foodArr.map((food) => {
            return <FoodCard key={Math.round(Math.random() * 1000)} food={food} fromLog={true} />;
          })
        )}
      </View>
      <View style={styles.kcalSteps}>
        {cals === 0 ? <></> : <Text style={styles.kcal}>Kcal: {cals}</Text>}
        {steps === 0 ? <></> : <Text style={styles.steps}>Steps: {steps}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 70 },
  kcalSteps: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 15,
  },
  list: {
    padding: 8,
  },
  nothing: { textAlign: 'center' },
  kcal: { fontSize: 18, fontWeight: '500' },
  steps: { fontSize: 18, fontWeight: '500' },
});
