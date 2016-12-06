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
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title" id="myModalLabel">Modal title</h4>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
