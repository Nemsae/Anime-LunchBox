import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveSearchResults (animeResults) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ANIME_RESULTS',
      payload: { animeResults }
    });
  },

  receiveFavorites (favorites) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_FAVORITES',
      payload: {favorites}
    });
  },

  receiveWatchList (watchList) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_WATCHLIST',
      payload: {watchList}
    });
  },

  receiveStickers (stickers) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_STICKERS',
      payload: { stickers }
    });
  }
};
export default ServerActions;
