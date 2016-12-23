import API from '../API';
// import AppDispatcher from '../AppDispatcher';
// import firebase from 'firebase';
// import { firebaseAuth, firebaseDb } from '../firebase';

// export function addNewFavorite(fav) {
//   userRef.child('favorites').push(fav);
//   return {
//     type: 'ADD_NEW_FAVORITE',
//   }
// }
//
// export function addNewToWatch(toWatch) {
//   userRef.child('watchList').push(toWatch);
//   return {
//     type: 'ADD_NEW_TOWATCH',
//   }
// }

const AnimeActions = {
  sendSearch (searchTerm) {
    API.receiveSearchResults(searchTerm);
  },

  addFavorites(favorites) {
    API.addFavorites(favorites);
  },

  addWatchList(watchList) {
  API.addWatchList(watchList);
  },
};

export default AnimeActions;
