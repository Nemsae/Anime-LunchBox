import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  receiveSearchResults (searchTerm) {
    axios.get(`https://kitsu.io/api/edge//anime?filter[text]=${searchTerm}`, {
      headers : {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    })
    .then((res) => {
      ServerActions.receiveSearchResults(res.data.data);
    })
    .catch((err) => {
      console.log('ERROR! API.receiveSearchResults', err);
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
