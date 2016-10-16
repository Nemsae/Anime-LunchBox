import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _animeResults = [];
let _favorites = [];
let _watchList = [];

class AnimeStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case 'RECEIVE_ANIME_RESULTS': {
          let { animeResults } = action.payload;
          _animeResults = animeResults;
          // console.log('_animeResults: ', _animeResults);
          this.emit('CHANGE');
        } break;
        case 'RECEIVE_FAVORITES': {
          let {favorites} = action.payload;
          _favorites = favorites.reverse();
          this.emit('CHANGE');
        } break;
        case 'RECEIVE_WATCHLIST': {
          let {watchList} = action.payload;
          _watchList = watchList.reverse();
          this.emit('CHANGE');
        } break;
      }
    });
  }

  startListening (cb) {
    this.on('CHANGE', cb);
  }

  stopListening (cb) {
    this.removeListener('CHANGE', cb);
  }

  getAnimeResults () {
    return _animeResults;
  }

  getFavorites () {
    return _favorites;
  }

  getWatchList () {
    return _watchList;
  }
}

export default new AnimeStore();
