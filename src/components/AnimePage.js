import React, { Component } from 'react';
import AnimeActions from '../actions/AnimeActions';
import AnimeList from './AnimeList';
import API from '../API';

export default class SearchPage extends Component {
  constructor () {
    super();
    this.submitSearch = this.submitSearch.bind(this);
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
    return (
      <div className='componentContainer'>
        <h1>Search Anime</h1>
        <form onSubmit={this.submitSearch} >
          <input ref='searchInput' type='text' className='form-control searchBar' />
          <button className='btn btn-primary' >Search</button>
        </form>
        <SearchTable />
      </div>
    );
  }
}
