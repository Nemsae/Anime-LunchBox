import React, { Component } from 'react';
import { Link } from 'react-router';
import AnimeStore from '../stores/AnimeStore';
import SignIn from './SignIn';

export default class NavBar extends Component {
  constructor () {
    super();

    this.state = {
      stickers: AnimeStore.getStickers(),
      modal: false,
      loggedIn: false,
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

  // _toggleModal() {
  //     this.setState({
  //       modal: !this.state.modal,
  //     });
  // }

  render () {
    let { stickers, modal, loggedIn } = this.state;

    return (
      <div>
        {loggedIn ? <div className='navbar navbar-inverse navbar-fixed-left'>
          <ul className='nav navbar-nav'>
            <li>Anime<br />LunchBox</li>
            <li><Link className='link' to='/'>Home</Link><img className='linkImg' src={stickers.home} /></li>
            {/* <li onClick={this._toggleModal}><a className='link' >SignOut</a><img className='linkImg' src={stickers.home} /></li> */}
            <li><Link className='link' to='/search'>Search</Link><img className='linkImg' src={stickers.search} /></li>
            <li><Link className='link' to='/favorites'>Favorites</Link><img className='linkImg' src={stickers.favorites} /></li>
            <li><Link className='link' to='/watchList'>WatchList</Link><img className='linkImg' src={stickers.watchlist} /></li>
          </ul>
        </div>
          :
          <div className='navbar navbar-inverse navbar-fixed-left'>
            <ul className='nav navbar-nav'>
              <li>Anime<br />LunchBox</li>
              <li><Link className='link' to='/'>Home</Link><img className='linkImg' src={stickers.home} /></li>
              {/* <li onClick={this._toggleModal}><a className='link' >Login</a><img className='linkImg' src={stickers.home} /></li> */}
              <li><Link className='link' to='/search'>Search</Link><img className='linkImg' src={stickers.search} /></li>
            </ul>
          </div>
        }
        <SignIn />
          </div>

    );
  }
}
