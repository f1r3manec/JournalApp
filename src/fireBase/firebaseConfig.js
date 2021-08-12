import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqN4tsAQrhYCD_5usi5LCG0g88hf8ejAE",
  authDomain: "ract-app-journal.firebaseapp.com",
  projectId: "ract-app-journal",
  storageBucket: "ract-app-journal.appspot.com",
  messagingSenderId: "117433350030",
  appId: "1:117433350030:web:6e2583978b721b5f6256df",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
