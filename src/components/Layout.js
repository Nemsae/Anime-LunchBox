import React, { Component } from 'react';
import NavBar from './NavBar';

import AnimeActions from '../actions/AnimeActions';
import AuthStore from '../stores/AuthStore';
import { firebaseDb } from '../firebase';

export default class Layout extends Component {
  constructor () {
    super();
    this.state = {
      initStatus: AuthStore.getInitStatus()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    AuthStore.startListening(this._onChange);

    let { initStatus } = this.state;
  }

  componentWillUnmount () {
    AuthStore.stopListening(this._onChange);
  }


  _onChange () {
    this.setState({
      initStatus: AuthStore.getInitStatus()
    });
  }

  render () {
    let { initStatus } = this.state;
    if (initStatus) {
      let { uid } = initStatus;

      const usersRef = firebaseDb.ref('users');
      const currRef = usersRef.child(initStatus.uid);
      const currFavRef = usersRef.child(initStatus.uid).child('Favorites');
      const currWatchRef = usersRef.child(initStatus.uid).child('WatchList');

      //  Firebase RTDB node ref for current logged in user
      currRef.on('value', (snap) => {
        let curr = snap.val();
      });

      //  Firebase RTDB node ref for current user's Favorite
      currFavRef.on('value', (snap) => {
        let favs = snap.val();
        AnimeActions.addFavorites(favs)
      });

      //  Firebase RTDB node ref for current logged in user
      currWatchRef.on('value', (snap) => {
        let watch = snap.val();
        console.log('WatchList LayOut!@!!!!:', watch);
        AnimeActions.addWatchList(watch);
      });
    }
    return (
      <div className='layoutContainer'>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}
