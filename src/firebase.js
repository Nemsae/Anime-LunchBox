import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyAlOW3qbowWxpXnyuWC3M65QmKe7nch4to',
  authDomain: 'testauth-eba5e.firebaseapp.com',
  databaseURL: 'https://testauth-eba5e.firebaseio.com',
  storageBucket: 'testauth-eba5e.appspot.com',
  messagingSenderId: '992651073933'
};
 // firebase.initializeApp(config);

export const firebaseApp = firebase.initializeApp(config);
export const firebaseDb = firebaseApp.database();
export const firebaseAuth = firebaseApp.auth();
