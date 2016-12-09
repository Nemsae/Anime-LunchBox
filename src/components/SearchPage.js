import React, { Component } from 'react';
import AnimeActions from '../actions/AnimeActions';
import AnimeList from './AnimeList';
import API from '../API';
import AnimeStore from '../stores/AnimeStore';
import AuthStore from '../stores/AuthStore';

import { firebaseCurrentUser, firebaseDb } from '../firebase';

export default class SearchPage extends Component {
  constructor () {
    super();
    this.state = {
      animeResults: AnimeStore.getAnimeResults(),
      initStatus: AuthStore.getInitStatus()
    };

    this.submitSearch = this.submitSearch.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    AnimeStore.startListening(this._onChange);
    AuthStore.startListening(this._onChange);

    let { initStatus } = this.state;
    console.log('00000000000000initStatus in SearchPage: ', initStatus);
    if (initStatus) {
      let currRef = firebaseDb.ref(initStatus.uid);
      console.log('00000000000000currRef: ', currRef);
      currRef.on('value', (snap) => {
        let curr = snap.val();
        console.log('----Some Value Changed----: ', curr);
      });
    }
    // const usersRef = firebaseDb.ref('users');
    // console.log('00000000000000usersRef: ', usersRef);
    // usersRef.on('value', (snap) => {
    //   let users = snap.val();
    //   console.log('----Some Value Changed----: ', users);
    // });
  }

  componentWillUnmount () {
    AnimeStore.stopListening(this._onChange);
    AuthStore.stopListening(this._onChange);
  }

  // shouldComponentUpdate () {
  // componentDidMount () {
    // console.log('--componentDidMount--');
    // console.log('--shouldComponentUpdate--');

  //   return true;
  // }

  _onChange () {
    this.setState({
      animeResults: AnimeStore.getAnimeResults(),
      initStatus: AuthStore.getInitStatus()
    })
  }

  submitSearch (e) {
    e.preventDefault();
    let {searchInput} = this.refs;
    let searchTerm = searchInput.value;
    AnimeActions.sendSearch(searchTerm);
    API.fetchStickers(searchTerm);
    API.fetchBackground(searchTerm);
  }

  render () {
    let { initStatus, animeResults } = this.state;
    // let { animeResults } = this.state;


    return (
      <div className='componentContainer'>
        <h1>Search Anime</h1>
        <form onSubmit={this.submitSearch} >
          <input ref='searchInput' type='text' className='form-control searchBar' />
          <button className='btn btn-primary' >Search</button>
        </form>
        <AnimeList animeList={animeResults} />
      </div>
    );
  }
}
