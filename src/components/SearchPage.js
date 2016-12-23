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
    if (initStatus) {
      let currRef = firebaseDb.ref(initStatus.uid);
      currRef.on('value', (snap) => {
        let curr = snap.val();
      });
    }
  }

  componentWillUnmount () {
    AnimeStore.stopListening(this._onChange);
    AuthStore.stopListening(this._onChange);
  }

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


    return (
      <div className='componentContainer'>
        <h1>Search Anime</h1>
        <form onSubmit={this.submitSearch} >
          <input ref='searchInput' type='text' className='form-control searchBar' />
          <button className='btn btn-primary' >Search</button>
        </form>
        <AnimeList animeList={animeResults} currPage={"search"} />
      </div>
    );
  }
}
