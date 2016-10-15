import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _animeResults = [];
let _animeFavorites = [];
let _animeWatch = [];

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
          break;
        }

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

  getFavorites() {
    return _animeFavorites;
  }

  getAnimeWatch() {
    return _animeWatch;
  }
}

export default new AnimeStore();
