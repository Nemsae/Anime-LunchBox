import API from '../API';

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
