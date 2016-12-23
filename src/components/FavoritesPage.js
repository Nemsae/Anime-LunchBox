import React, { Component } from 'react';
import AnimeActions from '../actions/AnimeActions';
import AnimeStore from '../stores/AnimeStore';
import API from '../API';
import uuid from 'uuid';
import AnimeList from './AnimeList';

export default class FavoritesPage extends Component {
  constructor () {
    super();
    this.state = {
      animeFavorites: AnimeStore.getFavorites()
    };
    this._onChange = this._onChange.bind(this);
    this._deleteFavorite = this._deleteFavorite.bind(this);
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

  _deleteFavorite (id) {
  }

  render () {
    let { animeFavorites } = this.state;
    return (
      <div className='componentContainer'>
        <h1>Favorites</h1>
        <AnimeList animeList={animeFavorites} currPage={'favorites'} />
      </div>
      );
  }
}
