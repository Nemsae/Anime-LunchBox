import React, { Component } from 'react';
import AnimeActions from '../actions/AnimeActions';
import SearchTable from './SearchTable';

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
  }

  render () {
    return (
      <div>
        <form onSubmit={this.submitSearch} >
          <input ref='searchInput' type='text' />
          <button>Search</button>
        </form>
        <SearchTable />
      </div>
    );
  }
}
