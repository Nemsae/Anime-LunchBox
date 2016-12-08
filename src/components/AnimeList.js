import React, { Component } from 'react';
import AnimeActions from '../actions/AnimeActions';
import AnimeStore from '../stores/AnimeStore';
import uuid from 'uuid';
import AnimeModal from './AnimeModal';

import { firebaseCurrentUser } from '../firebase';

export default class AnimeList extends Component {
  constructor () {
    super();

    this.state = {
      background: AnimeStore.getBackground(),
      currAnime: [],
    };

    this._onChange = this._onChange.bind(this);
    this.setCurrAnime = this.setCurrAnime.bind(this);
  }

  componentWillMount () {
    AnimeStore.startListening(this._onChange);
    console.log('firebaseCurrent id: ', firebaseCurrentUser.currentUser.uid);
  }

  componentWillUnmount () {
    AnimeStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      background: AnimeStore.getBackground(),
    });
  }

  setCurrAnime (anime) {
    this.setState({
      currAnime: anime,
    })
  }

  render () {
    let animeList = this.props.animeList;
    let { currAnime, background } = this.state;
    return (
      <div className='compContainer'>
        <AnimeModal anime={currAnime} background={background}/>
        {
          animeList.map((anime) => {
            return (
              <div key={anime.id} className='encloser' onClick={() => this.setCurrAnime(anime)} data-toggle='modal' data-target={`.bs-example-modal-md`}>
                <div className='animeSquare' >
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
