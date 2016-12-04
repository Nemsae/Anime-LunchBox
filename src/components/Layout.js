import React, { Component } from 'react';
import { Link } from 'react-router';
import AnimeStore from '../stores/AnimeStore';

export default class Layout extends Component {
  constructor () {
    super();

    this.state = {
      stickers: AnimeStore.getStickers()
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
      stickers: AnimeStore.getStickers()
    });
  }
  render () {
    let { stickers } = this.state;
    console.log('stickers in component: ', stickers);

    return (
      <div className='mainContainer'>
        <div className='navbar navbar-inverse navbar-fixed-left'>
          <ul className='nav navbar-nav'>
            <li>Anime<br />LunchBox</li>
            <li><Link className='link' to='/'>Login</Link><img className='linkImg' src={stickers.home} /></li>
            <li><Link className='link' to='/'>Home</Link><img className='linkImg' src={stickers.home} /></li>
            <li><Link className='link' to='/search'>Search</Link><img className='linkImg' src={stickers.search} /></li>
            <li><Link className='link' to='/favorites'>Favorites</Link><img className='linkImg' src={stickers.favorites} /></li>
            <li><Link className='link' to='/watchList'>WatchList</Link><img className='linkImg' src={stickers.watchlist} /></li>
          </ul>
        </div>
        <div className='container'>
          <div>
            <div className='pageContainer'>
            {this.props.children}
            </div>
          </div>
        </div>

      </div>
    );
  }
}
