import API from '../API';

const AnimeActions = {
  sendSearch (searchTerm) {
    API.receiveSearchResults(searchTerm);
  },

  sendToWatch (anime) {
    API.sendToWatch(anime);
  },

  sendFavorite (anime) {
    API.sendFavorite(anime);
  }
};

export default AnimeActions;
