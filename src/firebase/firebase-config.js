import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyACW8G0qfW__VB0omcyhzTO7pSEW43mVLI",
  authDomain: "journal-app-react-96e73.firebaseapp.com",
  projectId: "journal-app-react-96e73",
  storageBucket: "journal-app-react-96e73.appspot.com",
  messagingSenderId: "1024666506809",
  appId: "1:1024666506809:web:f1ca0ff926ba4f3bf6dfe8",
  measurementId: "G-DFR5QJE6X1"
};
  
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}