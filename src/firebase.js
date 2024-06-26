import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

import 'firebase/compat/firestore';
import 'firebase/firestore';

// import firebase from "./firebase"; 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCn7yNUEn-wPIMIynKAMAfgMPdVr27qIAs",
    authDomain: "slack-clone-df418.firebaseapp.com",
    projectId: "slack-clone-df418",
    storageBucket: "slack-clone-df418.appspot.com",
    messagingSenderId: "725839207885",
    appId: "1:725839207885:web:d70d0b22b3808e82faf884",
    measurementId: "G-RH0K0H68QX"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  // Initialize Firebase


// Initialize Realtime Database


// Initialize Authentication
export { auth, provider };

  
  export default db;

  {/*import { auth, provider } from './firebase';

  import db from './firebase' */}