import React, { Component } from 'react';
import { Link } from 'react-router';
import AnimeStore from '../stores/AnimeStore';
// import Login from './Login';
import { AuthActions, signInWithGoogle, signOut, initAuth } from '../actions/AuthActions';
import ServerActions from '../actions/ServerActions';
import AuthStore from '../stores/AuthStore';
import SignInModal from './SignInModal';

import { firebaseDb, firebaseCurrentUser } from '../firebase';

export default class NavBar extends Component {
  constructor () {
    super();
    this.state = {
      stickers: AnimeStore.getStickers(),
      modal: false,
      userStatus: AuthStore.getUserStatus(),
      errorStatus: AuthStore.getErrorStatus(),
      userNode: AuthStore.getUsers(),
      initSuccess: AuthStore.getInitStatus()
    };

    this._onChange = this._onChange.bind(this);
    this._googleSignIn = this._googleSignIn.bind(this);
    this._signOut = this._signOut.bind(this);
  }

  componentWillMount () {
    AnimeStore.startListening(this._onChange);

    // console.log('firebaseDb: ', firebaseDb);
    const usersRef = firebaseDb.ref('users');

    usersRef.on('value', (snap) => {
      let users = snap.val();
      console.log('userNode: ', users);

      //  TODO fluxify
      // AuthStore.getUsers(users);
    });

    AuthStore.startListening(this._onChange);

    //  run initAuthSuccess
    initAuth();
  }

  componentWillUnmount () {
    AnimeStore.stopListening(this._onChange);
    usersRef.off();
    AuthStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      stickers: AnimeStore.getStickers(),
      userStatus: AuthStore.getUserStatus(),
      errorStatus: AuthStore.getErrorStatus(),
      userNode: AuthStore.getUsers(),
      initSuccess: AuthStore.getInitStatus()
    });
  }

  _googleSignIn () {
    signInWithGoogle();
  }

  _signOut () {
    signOut();
  }

  render () {
    let { stickers, modal, loggedIn, userNode, userStatus, errorStatus, initSuccess } = this.state;
    console.log('this.state in navbar: ', this.state);
    console.log('this.props:', this.props);
    return (

      <div className="navbarContainer">
        <div className="userName">
          <img className="userNameImage" src="https://media.giphy.com/media/Kj9MIveYFMKvS/giphy.gif" alt=""/>
          {
            initSuccess ? <h3 className="userNameText">{userStatus.user.displayName}</h3> : <h3 className="userNameText">Guest</h3>
            // userStatus.authenticated ? <h3 className="userNameText">{userStatus.user.displayName}</h3> : <h3 className="userNameText">Guest</h3>
            }
        </div>

        <SignInModal signIn={this._googleSignIn} />
        <nav className="navbar navbar-inverse">
          <div className="">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Anime LunchBox</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">

              {
                // !userStatus.authenticated ?
                initSuccess ?
                  <ul className="nav navbar-nav navItemsContainer">
                    <li className="linkItem" ><Link className='link' to='/'>Home</Link><img className='linkImg' src={stickers.home} /></li>
                    <li className="linkItem" onClick={this._signOut}><Link className='link' className='link' >SignOut</Link><img className='linkImg' src={stickers.home} /></li>
                    <li className="linkItem" ><Link className='link' to='/search'>Search</Link><img className='linkImg' src={stickers.search} /></li>
                    <li className="linkItem" ><Link className='link' to='/favorites'>Favorites</Link><img className='linkImg' src={stickers.favorites} /></li>
                    <li className="linkItem" ><Link className='link' to='/watchList'>WatchList</Link><img className='linkImg' src={stickers.watchlist} /></li>
                  </ul>
                :
                  <ul className="nav navbar-nav navItemsContainer">
                    <li className="linkItem"><Link className='link' to='/'>Home</Link><img className='linkImg' src={stickers.home} /></li>
                    <li className="linkItem"><Link className='link' to='/search'>Search</Link><img className='linkImg' src={stickers.search} /></li>
                    <li className="linkItem" data-toggle="modal" data-target="#myModal"><Link className='link' >Sign In</Link><img className='linkImg' src={stickers.home} /></li>
                    <li className="linkItem"><Link className='link' ><span className="glyphicon glyphicon-user"></span> Sign Up</Link><img className='linkImg' src={stickers.home} /></li>
                  </ul>
              }


            </div>
          </div>
        </nav>



        {/* {loggedIn ? <div className='navbar navbar-inverse navbar-fixed-left'>
>>>>>>> 63ddfaf8ab3343e5fce87f9fa746ebc8ee893a1e
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
        } */}





        {/* <SignIn /> */}
          </div>

    );
  }
}
