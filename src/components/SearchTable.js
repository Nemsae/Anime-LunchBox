import React, { Component } from 'react';
import AnimeActions from '../actions/AnimeActions';
import AnimeStore from '../stores/AnimeStore';
import uuid from 'uuid';

export default class SearchTable extends Component {
  constructor () {
    super();

    this.state = {
      animeResults: AnimeStore.getAnimeResults()
    };

    this._onChange = this._onChange.bind(this);
    this._addFavorite = this._addFavorite.bind(this);
    this._addToWatch = this._addToWatch.bind(this);
  }

  componentWillMount () {
    AnimeStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    AnimeStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      animeResults: AnimeStore.getAnimeResults()
    });
  }

  _addFavorite (anime) {
    // console.log('anime of _add: ', anime);
    AnimeActions.sendFavorite(anime);
  }

  _addToWatch (anime) {
    // console.log('anime of _toWatch : ', anime);
    AnimeActions.sendToWatch(anime);
  }

  render () {
    let { animeResults } = this.state;

    var tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    function onYouTubeIframeAPIReady () {
      player = new YT.Player('player', {
        // height: '390',
        // width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }

    function onPlayerReady (event) {
      event.target.playVideo();
    }

    var done = false;
    function onPlayerStateChange (event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    function stopVideo () {
      player.stopVideo();
    }

    return (
      <div>
        {
          animeResults.map((anime) => {
            return (
              <div key={anime.id}>
                <h4>{anime.title}</h4>
                <div>
                  <img src={anime.cover_image} data-toggle='modal' data-target={`.bs-example-modal-md${anime.id}`} />
                </div>
                <div className={`modal fade bs-example-modal-md${anime.id}`} tabIndex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>
                  <div className='modal-dialog modal-md' role='document'>
                    <div className='modal-content'>
                      <div className='modalPicContainer' >
                        <h3 className='headings title'><b>{anime.title}</b></h3>

                        {/* <div id='player'></div> */}
                        <iframe allowFullScreen='allowFullScreen' id='player' type='text/html' width='640' height='390'
                          src={`https://www.youtube.com/embed?listType=search&list=${anime.title} anime`}
                          frameBorder='0'></iframe>

                        <img src={anime.cover_image} alt='main pic' />
                        <div className='animeInfoContainer'>
                          <h4>Status: {anime.status}</h4>
                          <h4>Episodes: {anime.episode_count}</h4>
                          <h4>Summary: {anime.synopsis}</h4>
                          <h4>Type: {anime.show_type}</h4>
                          <h4>Aired: {anime.started_airing} - {anime.finished_airing}</h4>
                          <h4>Rating: {Math.round(anime.community_rating * 100) / 100}</h4>
                          <h4>Rated: {anime.age_rating}</h4>
                          <h4>Genres:</h4>
                          {
                            anime.genres.map((genre) => {
                              return (
                                <h5 key={uuid()}>{genre.name}</h5>
                              );
                            })
                          }
                        </div>

                        <button onClick={this._addFavorite.bind(null, anime)}>Add to Favorites</button>
                        <button onClick={this._addToWatch.bind(null, anime)}>Add to WatchList</button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
