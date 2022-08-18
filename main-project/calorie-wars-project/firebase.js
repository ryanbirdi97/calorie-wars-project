import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAza4Op7C-30UFz8iaiafJH2jq_2ayp3Vc',
  authDomain: 'calorie-wars-2.firebaseapp.com',
  projectId: 'calorie-wars-2',
  storageBucket: 'calorie-wars-2.appspot.com',
  messagingSenderId: '499309437978',
  appId: '1:499309437978:web:78ac91bb2179c2dca5dda3',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
