// Import the functions you need from the SDKs you need

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
// const analytics = getAnalytics(app);
const app: FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

export { db, auth, getCurrentUser };
