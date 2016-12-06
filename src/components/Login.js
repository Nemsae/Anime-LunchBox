import React, { Component } from 'react';

import { AuthActions, signInWithGoogle, signOut } from '../actions/AuthActions';
// console.log('AuthActions: ', AuthActions);
import ServerActions from '../actions/ServerActions';
// console.log('ServerActions: ', ServerActions);
import AuthStore from '../stores/AuthStore';

export default class Login extends Component {
  constructor () {
    super();

    this.state = {
      userStatus: AuthStore.getUserStatus(),
      errorStatus: AuthStore.getErrorStatus(),
    };

    this._onChange = this._onChange.bind(this);
    this._googleSignIn = this._googleSignIn.bind(this);
    this._signOut = this._signOut.bind(this);
  }

  componentWillMount () {
    AuthStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    AuthStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      userStatus: AuthStore.getUserStatus(),
      errorStatus: AuthStore.getErrorStatus()
    });
  }

  _googleSignIn () {
    signInWithGoogle();
  }

  _signOut () {
    signOut();
  }

  render () {
    let { userStatus, errorStatus } = this.state;
    console.log('userStatus: ', userStatus);
    // console.log('errorStatus: ', errorStatus);
    return (
      <div className='loginModalContainer'>
        <div className ='loginModal'>
          {/* <div className='modalContent'></div> */}
          { userStatus.authenticated ?
            <button onClick={this._signOut}>Sign Out</button> :
            <button onClick={this._googleSignIn}>Google Sign In</button>
          }
        </div>

      </div>
    );
  }
}
