import React, { Component } from 'react';
import AnimeActions from '../actions/AnimeActions';
import AnimeStore from '../stores/AnimeStore';
import uuid from 'uuid';
import API from '../API';
import AnimeList from './AnimeList';

export default class WatchListPage extends Component {
  constructor () {
    super();

    this.state = {
      watchList: AnimeStore.getWatchList()
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    AnimeStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    AnimeStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      watchList: AnimeStore.getWatchList()
    });
  }

  _deleteToWatch (id) {
  }

  render () {
    let { watchList } = this.state;
    return (
      <div className='componentContainer'>
        <h1>Watch List</h1>
        <AnimeList  animeList={watchList} currPage={"WatchList"}/>
      </div>
    )
  }
}
