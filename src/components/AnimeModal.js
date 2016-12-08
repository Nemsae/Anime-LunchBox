import React, { Component } from 'react';
import AnimeActions from '../actions/AnimeActions';
import AnimeStore from '../stores/AnimeStore';
import uuid from 'uuid';
// import Youtube from './Youtube';

export default class AnimeModal extends Component {
  constructor() {
    super();
    this._addFavorite = this._addFavorite.bind(this);
    this._addToWatch = this._addToWatch.bind(this);
  }

  _addFavorite (anime) {
    AnimeActions.addFavorite(anime);
  }

  _addToWatch (anime) {
    AnimeActions.addToWatch(anime);
  }

  render() {
    let { anime, background } = this.props;
    let num = Math.floor(Math.random() * background.length);
    let divStyle = {
      backgroundImage: background.length && `url(${background[num].images.original.url})`
    };
    return (
      <div className={`modal fade bs-example-modal-md firstLevelModal`} id="animeModalMain" tabIndex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>
        <div className='modal-dialog modal-md secondLevelModal' role='document'>
          <div className='modal-content thirdLevelModal'>
            <div className='modalPicContainer fourthLevelModal' >

              
              <div className='animeInfoContainer'>
                <h5 className="animeModalClose" data-dismiss="modal" target="firstLevelModal">X</h5>
                <div className='animeTitle text-center'>
                  <img src={anime.cover_image} alt='main pic' className='modalPic' />
                  <h3 className='headings title'><b>{anime.title}</b></h3>
                </div>
                <div className='btnContainer text-center'>
                  <button className='btn btn-primary' onClick={this._addFavorite.bind(null, anime)}>Add to Favorites</button>
                  <button className='btn btn-success' onClick={this._addToWatch.bind(null, anime)}>Add to WatchList</button>
                </div>
                <div className='animeInfo'>
                  <h4>Type: {anime.show_type}</h4>
                  <h4>Status: {anime.status}</h4>
                  <h4>Episodes: {anime.episode_count}</h4>
                  <h4>Rating: {Math.round(anime.community_rating * 100) / 100}</h4>
                  <h4>Rated: {anime.age_rating}</h4>
                  <h4>Aired: {anime.started_airing} - {anime.finished_airing}</h4>
                </div>
                <h4 className='summary'>Summary: {anime.synopsis}</h4>
                <div className='genreContainer'>
                  <h4>Genres:</h4>
                  {
                    anime.genres !== undefined && anime.genres.map((genre) => {
                      console.log('genre.name:', genre.name);
                      return (
                        <h5 key={uuid()}>{genre.name}</h5>
                      );
                    })
                  }
                </div>
              </div>

              <div className='playerContainer'
                style={divStyle}
              >
                <iframe allowFullScreen='allowFullScreen' id='player' type='text/html' width='640' height='390'
                  src={`https://www.youtube.com/embed?listType=search&list=${anime.title} anime`}
                  frameBorder='0'></iframe>
              </div>


            </div>
          </div>
        </div>
      </div>
    );
  }
}
