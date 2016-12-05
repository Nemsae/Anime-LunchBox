import React, { Component } from 'react';
import AnimeActions from '../actions/AnimeActions';
import AnimeStore from '../stores/AnimeStore';
import uuid from 'uuid';
import AnimeModal from './AnimeModal';

export default class SearchTable extends Component {
  constructor () {
    super();

    this.state = {
      animeResults: AnimeStore.getAnimeResults(),
      background: AnimeStore.getBackground(),
      currAnime: [],
    };

    this._onChange = this._onChange.bind(this);
    this.setCurrAnime = this.setCurrAnime.bind(this);

  }

  componentWillMount () {
    AnimeStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    AnimeStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      animeResults: AnimeStore.getAnimeResults(),
      background: AnimeStore.getBackground(),
    });
  }

  setCurrAnime (anime) {
    this.setState({
      currAnime: anime,
    })
  }

  render () {
    let { animeResults, currAnime, background } = this.state;
    return (
      <div className='compContainer'>
        <AnimeModal anime={currAnime} background={background}/>
        {
          animeResults.map((anime) => {
            return (
              <div key={anime.id} className='encloser' data-toggle='modal' data-target={`.bs-example-modal-md${anime.id}`}>
                <div className='animeSquare' onClick={() => this.setCurrAnime(anime)}>
                  <div className='picContainer'>
                    <img  src={anime.cover_image} className='pic'/>
                  </div>
                  <h4>{anime.title}</h4>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
