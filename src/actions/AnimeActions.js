import API from '../API';

const AnimeActions = {
  sendSearch (searchTerm) {
    API.receiveSearchResults(searchTerm);
  },

  addToWatch (anime) {
    API.addToWatch(anime);
  },

  addFavorite (anime) {
    API.addFavorite(anime);
  },

  deleteFavorite (id) {
    API.deleteFavorite(id);
  },

  deleteToWatch (id) {
    API.deleteToWatch(id);
  }
};

export default AnimeActions;
