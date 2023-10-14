// Import the functions you need from the SDKs you need

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBXDbYtWz-CZnIW2den9_8a2oNaE9JsGf8',
  authDomain: 'hollowtracker.firebaseapp.com',
  projectId: 'hollowtracker',
  storageBucket: 'hollowtracker.appspot.com',
  messagingSenderId: '921511285740',
  appId: '1:921511285740:web:dc4bae691a288fe4b926c9',
  measurementId: 'G-EXV1BSY6LM',
};

// Initialize Firebase

const app: FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { db };
