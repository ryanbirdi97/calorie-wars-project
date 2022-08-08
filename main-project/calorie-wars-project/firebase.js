// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCNqPInFWtlMeoPZuFOginbwHSdNiHg_I",
  authDomain: "calorie-wars.firebaseapp.com",
  projectId: "calorie-wars",
  storageBucket: "calorie-wars.appspot.com",
  messagingSenderId: "576414371498",
  appId: "1:576414371498:web:d4f7fb899d080982d78ad3",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
