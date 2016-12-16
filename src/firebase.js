import firebase from 'firebase';

// Johns DB

var config = {
  apiKey: 'AIzaSyAdcfKv3Eg-zXCyyStWfCXAaFtflh3H3Gw',
  authDomain: 'anime-lunchbox.firebaseapp.com',
  databaseURL: 'https://anime-lunchbox.firebaseio.com',
  storageBucket: 'anime-lunchbox.appspot.com',
  messagingSenderId: '12879002376'
};

//Migs DB

// var config = {
//    apiKey: "AIzaSyB12cpmE1JeEQUQQ4sU8oU9tXy62RKifvM",
//    authDomain: "anime-lunchbox-4d84d.firebaseapp.com",
//    databaseURL: "https://anime-lunchbox-4d84d.firebaseio.com",
//    storageBucket: "anime-lunchbox-4d84d.appspot.com",
//    messagingSenderId: "1081951789607"
//  };

export const firebaseApp = firebase.initializeApp(config);
export const firebaseDb = firebaseApp.database();
export const firebaseAuth = firebaseApp.auth();
export const firebaseCurrentUser = firebase.auth();
