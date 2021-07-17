import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const  firebaseConfig = {
    apiKey: "AIzaSyCufjfLXqTxMZtvm6sNZSJpPwAmpuYJwUA",
    authDomain: "react-app-curso-de99e.firebaseapp.com",
    projectId: "react-app-curso-de99e",
    storageBucket: "react-app-curso-de99e.appspot.com",
    messagingSenderId: "91030324421",
    appId: "1:91030324421:web:94eb972213778176f5dcac"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}