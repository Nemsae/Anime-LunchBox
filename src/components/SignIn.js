import React, { Component } from 'react';

import { AuthActions, signInWithGoogle, signOut } from '../actions/AuthActions';
import ServerActions from '../actions/ServerActions';
import AuthStore from '../stores/AuthStore';
import SignInModal from './SignInModal';

export default class SignIn extends Component {
  constructor () {
    super();

    this.state = {
      userStatus: AuthStore.getUserStatus(),
      errorStatus: AuthStore.getErrorStatus()
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
    return (
      <div className='SignInContainer'>
        <SignInModal />
        <div className =''>
          { userStatus.authenticated ?
            <button onClick={this._signOut}>Sign Out</button> :
            <button data-toggle="modal" data-target="#myModal">Sign In</button>
          }
        </div>

      </div>
    );
  }
}
