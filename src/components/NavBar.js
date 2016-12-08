import React, { Component } from 'react';
import { Link } from 'react-router';
import AnimeStore from '../stores/AnimeStore';
import AuthStore from '../stores/AuthStore';
import Login from './Login';

import { firebaseDb } from '../firebase';

export default class NavBar extends Component {
  constructor () {
    super();

    this.state = {
      stickers: AnimeStore.getStickers(),
      modal: false,
      userStatus: AuthStore.getUserStatus()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    AnimeStore.startListening(this._onChange);
    console.log('firebaseDb: ', firebaseDb);
    const usersRef = firebaseDb.ref('users');

    usersRef.on('value', (snap) => {
      let users = snap.val();
      console.log('users: ', users);

      //  TODO fluxify
      AuthStore.getUsers(users);
    });
  }

  componentWillUnmount () {
    AnimeStore.stopListening(this._onChange);
    usersRef.off();
  }

  _onChange () {
    this.setState({
      stickers: AnimeStore.getStickers(),
      userStatus: AuthStore.getUserStatus(),
      users: AuthStore.getUsers()
    });
  }

  _toggleModal() {
      this.setState({
        modal: !this.state.modal,
      });
  }

  render () {
    let { stickers, modal, userStatus, users } = this.state;
    console.log('userStatus: ', userStatus);
    console.log('users: ', users);
    return (
      <div>

        {userStatus ? <div className='navbar navbar-inverse navbar-fixed-left'>
          <ul className='nav navbar-nav'>
            <li>Anime<br />LunchBox</li>
            <li><Link className='link' to='/'>Home</Link><img className='linkImg' src={stickers.home} /></li>
            <li onClick={this._toggleModal}><a className='link' >SignOut</a><img className='linkImg' src={stickers.home} /></li>
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
              <li onClick={this._toggleModal}><a className='link' >Login</a><img className='linkImg' src={stickers.home} /></li>
              <li><Link className='link' to='/search'>Search</Link><img className='linkImg' src={stickers.search} /></li>
            </ul>
          </div>
        }
        <Login />
          </div>

    );
  }
}
