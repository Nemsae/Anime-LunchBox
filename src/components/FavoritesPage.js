import React, { Component } from 'react';
import AnimeActions from '../actions/AnimeActions';
import AnimeStore from '../stores/AnimeStore';
import API from '../API';
import uuid from 'uuid';

export default class FavoritesPage extends Component {
  constructor () {
    super();

    this.state = {
      animeFavorites: AnimeStore.getFavorites()
    };

    this._onChange = this._onChange.bind(this);
    this._deleteFavorite = this._deleteFavorite.bind(this);
  }

  componentWillMount () {
    API.fetchFavorites();
    AnimeStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    AnimeStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      animeFavorites: AnimeStore.getFavorites()
    });
  }

  _deleteFavorite (id) {
    AnimeActions.deleteFavorite(id);
  }

  render () {
    let { animeFavorites } = this.state;
    console.log('favs in component:', animeFavorites);
    return (
      <div className='componentContainer'>
        <h1>Favorites</h1>
        {
          animeFavorites.map((anime) => {
            return (
              <div key={uuid()} className='encloser'>
                <div>
                  <img src={anime.image} data-toggle='modal' data-target={`.bs-example-modal-md${anime.id}`} />
                </div>
                <h4>{anime.title}</h4>
                <div className={`modal fade bs-example-modal-md${anime.id}`} tabIndex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>
                  <div className='modal-dialog modal-md' role='document'>
                    <div className='modal-content'>
                      <div className='modalPicContainer' >
                        <h3 className='headings title'><b>{anime.title}</b></h3>

                        <iframe allowFullScreen='allowFullScreen' id='player' type='text/html' width='640' height='390'
                          src={`https://www.youtube.com/embed?listType=search&list=${anime.title} anime`}
                          frameBorder='0'></iframe>

                        <img src={anime.image} alt='main pic' />
                        <div className='animeInfoContainer'>
                        <h4>Type: {anime.type}</h4>
                         <h4>Status: {anime.status}</h4>
                         <h4>Episodes: {anime.episodes}</h4>
                         <h4>Aired: {anime.started} - {anime.finished}</h4>
                         <h4>Rating: {Math.round(anime.rating * 100) / 100}</h4>
                         <h4>Rated: {anime.rated}</h4>
                         <h4>Summary: {anime.summary}</h4>
                         <h4>Genres:</h4>
                          {
                            JSON.parse(anime.genres).map(genre => {
                              return (
                                <h5 key ={uuid()}>{genre.name}</h5>
                              )
                            })
                          }
                        </div>
                        <button onClick={this._deleteFavorite.bind(null, anime.animeId)} data-dismiss='modal'>Delete</button>
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
