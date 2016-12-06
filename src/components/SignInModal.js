import React, { Component } from 'react';
import Login from './Login';
// import { AuthActions, signInWithGoogle, signOut } from '../actions/AuthActions';
// console.log('AuthActions: ', AuthActions);
// import ServerActions from '../actions/ServerActions';
// console.log('ServerActions: ', ServerActions);
// import AuthStore from '../stores/AuthStore';

export default function Login () {
    let { userStatus, errorStatus } = this.state;
    console.log('userStatus: ', userStatus);
    // console.log('errorStatus: ', errorStatus);
    return (
      <div className='loginModalContainer'>
        <div className ='loginModal'>
          {/* <div className='modalContent'></div> */}
          <Login />
        </div>

      </div>
    );
  }
}
