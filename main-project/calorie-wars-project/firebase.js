import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBCNqPInFWtlMeoPZuFOginbwHSdNiHg_I',
  authDomain: 'calorie-wars.firebaseapp.com',
  projectId: 'calorie-wars',
  storageBucket: 'calorie-wars.appspot.com',
  messagingSenderId: '576414371498',
  appId: '1:576414371498:web:d4f7fb899d080982d78ad3',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
