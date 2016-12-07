import React, { Component } from 'react';
// import Login from './Login';
// import { AuthActions, signInWithGoogle, signOut } from '../actions/AuthActions';
// console.log('AuthActions: ', AuthActions);
// import ServerActions from '../actions/ServerActions';
// console.log('ServerActions: ', ServerActions);
// import AuthStore from '../stores/AuthStore';

export default function SignInModal () {
    // let { userStatus, errorStatus } = this.state;
    // console.log('userStatus: ', userStatus);
    // console.log('errorStatus: ', errorStatus);
    return (
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">Anime LunchBox</h4>
            </div>
            <div className="modal-body">
              <form >
                <label htmlFor="email">Email</label>
                <input name="email" className="form-control" type="text" label="Email"/>
                <label htmlFor="password">Password</label>
                <input name="password" className="form-control" type="password" label="Password"/>

                <div className='loginContainer'>
                  <button action='submit' className=" btn signBtn">Sign In</button>
                  <button className=" btn signBtn">Sign Up</button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <div className="googleSignContainer text-center">
                <button
                  className="signBtn btn googleSignBtn"
                  // onClick={this.googleSignIn}
                >
                  <h5 className="signInText">Sign in with Google</h5>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
