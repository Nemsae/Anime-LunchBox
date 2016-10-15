import React, { Component } from 'react';
// import AnimeActions from '../actions/AnimeActions';
import AnimeStore from '../stores/AnimeStore';
import uuid from 'uuid';

export default class FavoritesPage extends Component {
  constructor () {
    super();

    this.state = {
      animeFavorites: AnimeStore.getFavorites()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
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

  render () {
    let { animeFavorites } = this.state;
    return (
      <div>
        {
          animeFavorites.map(anime => {
            return (
              <div key={anime.id}>
                <h4>{anime.title}</h4>
                <div>
                  <img src={anime.cover_image} data-toggle='modal' data-target={`.bs-example-modal-md${anime.id}`} />
                </div>
               <div className={`modal fade bs-example-modal-md${anime.id}`} tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                 <div className="modal-dialog modal-md" role="document">
                   <div className="modal-content">
                     <div className="modalPicContainer" >
                      <h3 className="headings title"><b>{anime.title}</b></h3>
                       <img src={anime.cover_image} alt="main pic" />
                       <div className="animeInfoContainer">
                        <h4>Type: {anime.show_type}</h4>
                         <h4>Status: {anime.status}</h4>
                         <h4>Episodes: {anime.episode_count}</h4>
                         <h4>Started: {anime.started_airing}</h4>
                         <h4>Ended: {anime.finished_airing}</h4>
                         <h4>Rating: {Math.round(anime.community_rating * 100)/100}</h4>
                         <h4>Rated: {anime.age_rating}</h4>
                         <h4>Summary: {anime.synopsis}</h4>
                         <h4>Genres:</h4>
                         {
                           anime.genres.map(genre => {
                             return (
                               <h5 key ={uuid()}>{genre.name}</h5>
                             )
                           })
                         }
                       </div>
                     </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
