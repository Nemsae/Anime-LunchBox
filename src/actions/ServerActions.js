import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveSearchResults (animeResults) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ANIME_RESULTS',
      payload: { animeResults }
    });
  }
};
export default ServerActions;
