import React, { Component } from 'react';
// import AnimeActions from '../actions/AnimeActions';
import AnimeStore from '../stores/AnimeStore';
// import uuid from 'uuid';
import AnimeModal from './AnimeModal';

// import { firebaseCurrentUser } from '../firebase';

export default class AnimeList extends Component {
  constructor () {
    super();

    this.state = {
      background: AnimeStore.getBackground(),
      currAnime: []
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
      background: AnimeStore.getBackground()
    });
  }

  setCurrAnime (anime) {
    this.setState({
      currAnime: anime
    });
  }

  render () {
    let animeList = this.props.animeList;
    console.log('00000animeList in AnimeList: ', animeList);
    let AnimeList = [];
    if (typeof animeList === 'object') {
      let keys = Object.keys(animeList);
      AnimeList = keys.map(anime => {
        console.log('anime090909090909: ', anime);
        console.log('curr09090909090: ', animeList);
        console.log('currAnime09090909090: ', animeList[anime]);
        return (
          <div key={animeList[anime].id} className='encloser' onClick={() => this.setCurrAnime(animeList[anime])} data-toggle='modal' data-target={`.bs-example-modal-md`}>
            <div className='animeSquare'>
              <div className='picContainer'>
                <img src={animeList[anime].cover_image} className='pic' />
              </div>
              <h4>{animeList[anime].title}</h4>
            </div>
          </div>
        );
      });
    }
    let { currAnime, background } = this.state;
    return (
      <div className='compContainer'>
        <AnimeModal anime={currAnime} background={background} />
        {
          AnimeList
        }
      </div>
    );
  }
}
