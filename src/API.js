import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  receiveSearchResults (searchTerm) {
    console.log('searchTerm:', searchTerm);
    axios.get(`https://kitsu.io/api/edge//anime?filter[text]=${searchTerm}`, {
      headers : {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    })
    .then((res) => {
      console.log('res in API: ', res.data.data);
      ServerActions.receiveSearchResults(res.data.data);
    })
    .catch((err) => {
      console.log('ERROR! API.receiveSearchResults', err);
    });
  },

  addToWatch (anime) {
    axios.post('/api/anime/watchlist', anime)
      .then((res) => {
        ServerActions.receiveWatchList(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.addToWatch', err);
      });
  },

  addFavorite (anime) {
    axios.post('/api/anime/favorites', anime)
      .then((res) => {
        ServerActions.receiveFavorites(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.addFavorite', err);
      });
  },

  fetchFavorites () {
    axios.get('/api/anime/favorites')
      .then((res) => {
        ServerActions.receiveFavorites(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.fetchFavorites', err);
      });
  },

  fetchWatchList () {
    axios.get('/api/anime/watchlist')
      .then((res) => {
        ServerActions.receiveWatchList(res.data);
      })
      .catch((err) => {
        console.log('ERROR! API.fetchWatchList', err);
      });
  },

  deleteFavorite (id) {
    axios.delete(`/api/anime/favorites?id=${id}`)
      .then((res) => {
        API.fetchFavorites();
      })
      .catch((err) => {
        console.log('ERROR! API.deleteFavorite', err);
      });
  },

  deleteToWatch (id) {
    axios.delete(`/api/anime/watchlist?id=${id}`)
      .then((res) => {
        API.fetchWatchList();
      })
      .catch((err) => {
        console.log('ERROR! API.deleteToWatch', err);
      });
  },

  fetchStickers (searchTerm) {
    axios.get(`http://api.giphy.com/v1/stickers/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC`)
      .then((res) => {
        ServerActions.receiveStickers(res.data.data);
      })
      .catch((err) => {
        console.log('ERROR! API.fetchStickers', err);
      });
  },

  fetchBackground (searchTerm) {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC`)
      .then((res) => {
        ServerActions.receiveBackground(res.data.data);
      })
      .catch((err) => {
        console.log('ERROR! API.fetchStickers', err);
      });
  }

};

export default API;
