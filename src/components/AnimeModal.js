import React, { Component } from 'react';
import AnimeActions from '../actions/AnimeActions';
// import AnimeStore from '../stores/AnimeStore';
import AuthStore from '../stores/AuthStore';
import uuid from 'uuid';

import { firebaseDb, firebaseCurrentUser } from '../firebase';

export default class AnimeModal extends Component {
  constructor () {
    super();

    this.state = {
      initStatus: AuthStore.getInitStatus()
    };
    this._addFavorite = this._addFavorite.bind(this);
    this._onChange = this._onChange.bind(this);
    this._addToWatch = this._addToWatch.bind(this);
    this._animeDetails = this._animeDetails.bind(this);

  }

  componentWillMount () {
    let { initStatus } = this.state;

    AuthStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    AuthStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      initStatus: AuthStore.getInitStatus()
    });
  }

  _animeDetails (anime, addType, uid) {
    console.log('ANIME IN DETAILSSSSS:', anime);
    firebaseDb.ref('users/' + `${uid}/` + `${addType}/` + `${anime.attributes.titles.en ? anime.attributes.titles.en : anime.attributes.titles.en_jp}/`).update({
      id: anime.id,
      title: anime.attributes.titles.en ? anime.attributes.titles.en : anime.attributes.titles.en_jp,
      episode_count: anime.attributes.episodeCount,
      cover_image: anime.attributes.posterImage.original,
      synopsis: anime.attributes.synopsis,
      show_type: anime.attributes.showType,
      started_airing: anime.attributes.startDate,
      finished_airing: anime.attributes.endDate,
      community_rating: Math.round(anime.attributes.averageRating * 100) / 100,
      age_rating: anime.attributes.ageRating,
      // genres: JSON.stringify(anime.attributes.genres)
    });
  }

  _addFavorite (anime) {
    var show = anime;
    let { initStatus } = this.state;
    if (initStatus) {
      let { uid } = initStatus;
      this._animeDetails(show,'Favorites', uid);
    }
  }

  _addToWatch (anime) {
    var show = anime;
    let { initStatus } = this.state;
    if (initStatus) {
      let { uid } = initStatus;
      this._animeDetails(show,'Watchlist', uid);
  }
}

  render () {

    let { anime, background, currPage } = this.props;
    console.log('anime:', anime);
    let num = Math.floor(Math.random() * background.length);
    let divStyle = {
      backgroundImage: background.length && `url(${background[num].images.original.url})`
    };
    return (
      <div className={`modal fade bs-example-modal-md firstLevelModal`} id="animeModalMain" tabIndex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>
        <div className='modal-dialog modal-md secondLevelModal' role='document'>
          <div className='modal-content thirdLevelModal'>
            <div className='modalPicContainer fourthLevelModal' >
              {
                Object.keys(anime).length &&
                  <div className='animeInfoContainer'>
                    <h5 className="animeModalClose" data-dismiss="modal" target="firstLevelModal">X</h5>
                    <div className='animeTitle text-center'>
                      <img src={anime.attributes.posterImage.original || ''} alt='main pic' className='modalPic' />
                      <h3 className='headings title'><b>{anime.attributes.titles.en ? anime.attributes.titles.en : anime.attributes.titles.en_jp}</b></h3>
                    </div>
                    { currPage === "search" ?
                      <div className='btnContainer text-center'>
                        <button className='btn btn-primary' onClick={this._addFavorite.bind(null, anime)}>Add to Favorites</button>
                        <button className='btn btn-success' onClick={this._addToWatch.bind(null, anime)}>Add to WatchList</button>
                      </div>
                      :
                      <div className="btnContainer text-center">
                        <button className="btn btn-danger">Delete</button>
                      </div>
                    }
                    <div className='animeInfo'>
                      <h4>Type: {anime.attributes.showType}</h4>
                      {/* <h4>Status: {anime.status}</h4> */}
                      <h4>Episodes: {anime.attributes.episodeCount}</h4>
                      <h4>Rating: {Math.round(anime.attributes.averageRating * 100) / 100}</h4>
                      <h4>Rated: {anime.attributes.ageRating}</h4>
                      <h4>Aired: {anime.attributes.startDate} - {anime.attributes.endDate}</h4>
                    </div>
                    <h4 className='summary'>Summary: {anime.attributes.synopsis}</h4>
                    <div className='genreContainer'>
                      <h4>Genres:</h4>
                      {
                        // anime.genres !== undefined && anime.genres.map((genre) => {
                        //   console.log('genre.name:', genre.name);
                        //   return (
                        //     <h5 key={uuid()}>{genre.name}</h5>
                        //   );
                        // })
                      }
                    </div>
                  </div>

              }

              {
                Object.keys(anime).length &&
                  <div className='playerContainer'
                    style={divStyle}
                  >
                    <iframe allowFullScreen='allowFullScreen' id='player' type='text/html' width='640' height='390'
                      src={anime.attributes.youtubeVideoId ? `https://www.youtube.com/embed?listType=search&list=${anime.attributes.youtubeVideoId}` : `https://www.youtube.com/embed?listType=search&list=${anime.attributes.titles.en ? anime.attributes.titles.en : anime.attributes.titles.en_jp} anime`}
                      frameBorder='0'></iframe>
                  </div>
              }


            </div>

          </div>
        </div>
      </div>
    );
  }
}
