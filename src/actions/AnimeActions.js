import API from '../API';
import AppDispatcher from '../AppDispatcher';
import firebase from 'firebase';
import { firebaseAuth, firebaseDb } from '../firebase';

export function addNewFavorite(fav) {
  userRef.child('favorites').push(fav);
  return {
    type: 'ADD_NEW_FAVORITE',
  }
}

export function addNewToWatch(toWatch) {
  userRef.child('watchList').push(toWatch);
  return {
    type: 'ADD_NEW_TOWATCH',
  }
}

const AnimeActions = {
  sendSearch (searchTerm) {
    API.receiveSearchResults(searchTerm);
  },

  updateFavorites (favorites) {
    console.log('favorites in AnimeActions: ', favorites);
    AppDispatcher.dispatch({
      type: 'RECEIVE_FAVORITES',
      payload: {favorites}
    });
  },

  updateWatchList (watchList) {
    console.log('watchList in AnimeActions: ', watchList);
    AppDispatcher.dispatch({
      type: 'RECEIVE_WATCHLIST',
      payload: {watchList}
    });
  },

//   deleteFavorite (id) {
//     API.deleteFavorite(id);
//   },
//
//   deleteToWatch (id) {
//     API.deleteToWatch(id);
//   }
};

export default AnimeActions;
