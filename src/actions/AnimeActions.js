import API from '../API';
import AppDispatcher from '../AppDispatcher';

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

  // addFavorite (favorites) {
  //   console.log('favorites in AnimeActions: ', favorites);
  //   AppDispatcher.dispatch({
  //     type: 'RECEIVE_FAVORITES',
  //     payload: {favorites}
  //   });
  // },

  updateWatchList (watchList) {
    console.log('watchList in AnimeActions: ', watchList);
    AppDispatcher.dispatch({
      type: 'RECEIVE_WATCHLIST',
      payload: {watchList}
    });
  },
  //
  // addToWatch (watchList) {
  //   console.log('watchList in AnimeActions: ', watchList);
  //   AppDispatcher.dispatch({
  //     type: 'RECEIVE_WATCHLIST',
  //     payload: {watchList}
  //   });
  // },

  deleteFavorite (id) {
    API.deleteFavorite(id);
  },

  deleteToWatch (id) {
    API.deleteToWatch(id);
  }
};

export default AnimeActions;
