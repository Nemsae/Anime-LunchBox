import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _animeResults = [];
let _favorites = [];
let _watchList = [];
let _stickers = {home: 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FkuWN0iF9BLQKk%2Fgiphy.gif', search: 'https://media.giphy.com/media/Is54ejaz7HiZW/giphy.gif', favorites: 'https://media.giphy.com/media/SVacpp6YPRtTO/giphy.gif', watchlist: 'https://media.giphy.com/media/KG5hDHiZVEmZO/giphy.gif'};
let _backgroundImage = '';

class AnimeStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case 'RECEIVE_ANIME_RESULTS': {
          let { animeResults } = action.payload;
          _animeResults = animeResults;
          this.emit('CHANGE');
        } break;
        case 'RECEIVE_FAVORITES': {
          let {favorites} = action.payload;
          // console.log('favorites in store: ', favorites);
          _favorites = favorites;
          this.emit('CHANGE');
        } break;
        case 'RECEIVE_WATCHLIST': {
          let {watchList} = action.payload;
          // console.log('watchList in store: ', watchList);
          _watchList = watchList;
          this.emit('CHANGE');
        } break;
        case 'RECEIVE_STICKERS': {
          let { stickers } = action.payload;
          // console.log('stickers in store: ', stickers);
          _stickers.home = stickers[0] ? stickers[0].images.downsized.url : 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FkuWN0iF9BLQKk%2Fgiphy.gif';
          _stickers.search = stickers[1] ? stickers[1].images.downsized.url : 'https://media.giphy.com/media/Is54ejaz7HiZW/giphy.gif';
          _stickers.favorites = stickers[2] ? stickers[2].images.downsized.url : 'https://media.giphy.com/media/SVacpp6YPRtTO/giphy.gif';
          _stickers.watchlist = stickers[3] ? stickers[3].images.downsized.url : 'https://media.giphy.com/media/KG5hDHiZVEmZO/giphy.gif';
          this.emit('CHANGE');
        } break;
        case 'RECEIVE_BACKGROUND': {
          let { bgImage } = action.payload;
          _backgroundImage = bgImage;
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

  getStickers () {
    return _stickers;
  }

  getBackground () {
    return _backgroundImage;
  }
}

export default new AnimeStore();
