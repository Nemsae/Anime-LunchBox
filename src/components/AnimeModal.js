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

  _addFavorite (anime) {
    let { initStatus } = this.state;
    if (initStatus) {
    // if (initStatus !== false) {
      console.log('Sanity:111');
      let { uid } = initStatus;
      console.log('11111111111111initStatus.uid: ', uid);

      // const usersRef = firebaseDb.ref('users');
      // const currRef = firebaseDb.ref('users').child(uid);
      // console.log('00000000000000currRef: ', currRef);
      // currRef.on('value', (snap) => {
      //   let curr = snap.val();
      //   console.log('00000000000000currNode: ', curr);
      // });

      console.log('anime: ', anime);
      firebaseDb.ref('users/' + `${uid}/` + 'Favorites/' + `${anime.title}/`).update({
      // firebaseDb.ref('users/' + userId).set({
      id: anime.id,
      status: anime.status,
      title: anime.title,
      episode_count: anime.episode_count,
      cover_image: anime.cover_image,
      synopsis: (anime.synopsis).replace(/'/g, "''"),
      show_type: anime.show_type,
      started_airing: anime.started_airing,
      finished_airing: anime.finished_airing,
      community_rating: anime.community_rating,
      age_rating: anime.age_rating,
      genres: JSON.stringify(anime.genres)
      });
    }
  }

  _addToWatch (anime) {
    let { initStatus } = this.state;
    if (initStatus) {
    // if (initStatus !== false) {
      console.log('Sanity:111');
      let { uid } = initStatus;
      console.log('11111111111111initStatus.uid: ', uid);

      // const usersRef = firebaseDb.ref('users');
      // const currRef = firebaseDb.ref('users').child(uid);
      // console.log('00000000000000currRef: ', currRef);
      // currRef.on('value', (snap) => {
      //   let curr = snap.val();
      //   console.log('00000000000000currNode: ', curr);
      // });

      console.log('anime: ', anime);
      firebaseDb.ref('users/' + `${uid}/` + 'WatchList/' + `${anime.title}/`).update({
      // firebaseDb.ref('users/' + userId).set({
        id: anime.id,
        status: anime.status,
        title: anime.title,
        episode_count: anime.episode_count,
        cover_image: anime.cover_image,
        synopsis: (anime.synopsis).replace(/'/g, "''"),
        show_type: anime.show_type,
        started_airing: anime.started_airing,
        finished_airing: anime.finished_airing,
        community_rating: anime.community_rating,
        age_rating: anime.age_rating,
        genres: JSON.stringify(anime.genres)
      });
    }
  }

  render () {

    let { anime, background, currPage } = this.props;
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
                    // anime.genres !== undefined && anime.genres.map((genre) => {
                    //   console.log('genre.name:', genre.name);
                    //   return (
                    //     <h5 key={uuid()}>{genre.name}</h5>
                    //   );
                    // })
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
