import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA5F-3-p-lwtPrBx8J8iPI4B64MnguY5qg',
  authDomain: 'calorie-wars-3.firebaseapp.com',
  projectId: 'calorie-wars-3',
  storageBucket: 'calorie-wars-3.appspot.com',
  messagingSenderId: '932471827995',
  appId: '1:932471827995:web:a39bde57aa4b3f5ec612be',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
