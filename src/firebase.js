import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyAdcfKv3Eg-zXCyyStWfCXAaFtflh3H3Gw',
  authDomain: 'anime-lunchbox.firebaseapp.com',
  databaseURL: 'https://anime-lunchbox.firebaseio.com',
  storageBucket: 'anime-lunchbox.appspot.com',
  messagingSenderId: '12879002376'
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseDb = firebaseApp.database();
export const firebaseAuth = firebaseApp.auth();
export const firebaseCurrentUser = firebase.auth();
