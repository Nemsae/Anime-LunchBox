import React, { Component } from 'react';
import NavBar from './NavBar';

import AnimeActions from '../actions/AnimeActions';
import AuthStore from '../stores/AuthStore';
import { firebaseDb } from '../firebase';

// export default function Layout(props) {
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
    // console.log('LAYOUT initStatus: ', initStatus);
    // // if (initStatus) {
    //   // let currRef = firebaseDb.ref(initStatus.uid);
    //   // console.log('LAYOUT currRef: ', currRef);
    // const usersRef = firebaseDb.ref('users');
    // // const currRef = usersRef.child(initStatus.uid);
    // usersRef.on('value', (snap) => {
    //   let curr = snap.val();
    //   console.log('----LAYOUT Some Value Changed----: ', curr);
    //   AnimeActions.updateDatabase
    // });
    // }


    // const usersRef = firebaseDb.ref('users');
    // console.log('00000000000000usersRef: ', usersRef);
    // usersRef.on('value', (snap) => {
    //   let users = snap.val();
    //   console.log('----Some Value Changed----: ', users);
    // });
  }

  componentWillUnmount () {
    AuthStore.stopListening(this._onChange);
  }

  // shouldComponentUpdate () {
  // componentDidMount () {
    // console.log('--componentDidMount--');
    // console.log('--shouldComponentUpdate--');

  //   return true;
  // }

  _onChange () {
    this.setState({
      initStatus: AuthStore.getInitStatus()
    });
  }

  render () {
    let { initStatus } = this.state;
    if (initStatus) {
      let { uid } = initStatus;
      console.log('LAYOUT uid: ', uid);

      const usersRef = firebaseDb.ref('users');
      const currRef = usersRef.child(initStatus.uid);
      const currFavRef = usersRef.child(initStatus.uid).child('Favorites');
      const currWatchRef = usersRef.child(initStatus.uid).child('WatchList');

      //  Firebase RTDB node ref for current logged in user
      currRef.on('value', (snap) => {
        let curr = snap.val();
        console.log('----LAYOUT Some Value Changed----: ', curr);
      });

      //  Firebase RTDB node ref for current user's Favorite
      currFavRef.on('value', (snap) => {
        let favs = snap.val();
        console.log('----LAYOUT Favorites Changed----: ', favs);
        AnimeActions.updateFavorites(favs)
      });

      //  Firebase RTDB node ref for current logged in user
      currWatchRef.on('value', (snap) => {
        let watch = snap.val();
        console.log('----LAYOUT WatchList Changed----: ', watch);
        AnimeActions.updateWatchList(watch);
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
