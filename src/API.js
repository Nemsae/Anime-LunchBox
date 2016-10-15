import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  receiveSearchResults (searchTerm) {
    axios.get(`/api/anime/search?anime=${searchTerm}`)
    .then((res) => {
      // console.log('res in API: ', res);
      ServerActions.receiveSearchResults(res.data);
    })
    .catch((err) => {
      console.log('ERROR! API.receiveSearchResults', err);
    });
  },

  sendToWatch (anime) {
    axios.post('/api/anime/watchlist', anime)
      .then((res) => {
        console.log('res of toWatch in API: ', res);
      })
      .catch((err) => {
        console.log('ERROR! API.sendToWatch', err);
      });
  },

  sendFavorite (anime) {
    axios.post('/api/anime/favorites', anime)
      .then((res) => {
        console.log('res of toWatch in API: ', res);
      })
      .catch((err) => {
        console.log('ERROR! API.sendFavorite', err);
      });
  }
};

export default API;
