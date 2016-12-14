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
    // API.fetchWatchList();
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
    console.log('id watchlist: ', id);
    AnimeActions.deleteToWatch(id);
  }

  render () {
    let { watchList } = this.state;
    console.log('watchList component: ', watchList);
    return (
      <div className='componentContainer'>
        <h1>Watch List</h1>
        <AnimeList  animeList={ watchList }/>
        {/*<div className="compContainer">
          {
            watchList.map((anime) => {
            let divStyle = {
            backgroundImage: `url(${anime.image})`
            };
            return (
            <div className="compContainer">
            <div key={anime.id} className='encloser'>

            <div>
            <img src={anime.image} data-toggle='modal' data-target={`.bs-example-modal-md${anime.id}`} />
            </div>
            <h4>{anime.title}</h4>
            <div className={`modal fade bs-example-modal-md${anime.id} firstLevelModal`} tabIndex='-1' role='dialog' aria-labelledby='mySmallModalLabel'>
            <div className='modal-dialog modal-md secondLevelModal' role='document'>
            <div className='modal-content thirdLevelModal'>
            <div className='modalPicContainer fourthLevelModal' >

            <div className='playerContainer' style={divStyle}>
            <iframe allowFullScreen='allowFullScreen' id='player' type='text/html' width='640' height='390'
            src={`https://www.youtube.com/embed?listType=search&list=${anime.title} anime`}
            frameBorder='0'></iframe>
            </div>

            <div className='animeInfoContainer'>
            <img src={anime.image} alt='main pic' className='modalPic' />
            <h3 className='headings title'><b>{anime.title}</b></h3>
            <div className='sideImageInfo'>

            <h4>Type: {anime.type}</h4>
            <h4>Status: {anime.status}</h4>
            <h4>Episodes: {anime.episodes}</h4>
            <h4>Rating: {Math.round(anime.rating * 100) / 100}/5</h4>
            <h4>Rated: {anime.rated}</h4>
            <h4>Aired: {anime.started} - {anime.finished}</h4>
            </div>
            <h4 className='summary'>Summary: {anime.summary}</h4>
            <div className='genreContainer'>
            <h4>Genres:</h4>
            {
            JSON.parse(anime.genres).map((genre) => {
            return (
            <h5 key={uuid()}>{genre.name}</h5>
            );
            })
            }
            </div>
            </div>
            <button className='delBtn btn btn-danger' onClick={this._deleteToWatch.bind(this, anime.animeId)} data-dismiss='modal'>Delete</button>
            </div>
            </div>
            </div>
            </div>
            </div>
            // </div>
            )
            })
            }
          </div> */}
      </div>

    )
  }
}
