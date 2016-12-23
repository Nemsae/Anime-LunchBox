import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _userStatus = {
  authenticated: false,
  user: {}
};
let _initStatus = false;
let _errorStatus = 'No User Error';
let _users = [];

class AuthStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case 'SIGN_IN_SUCCESS': {
          let { uid, email, displayName, photoURL } = action.payload;
          _userStatus = {
            authenticated: true,
            user: { uid, email, displayName, photoURL }
          }
          this.emit('CHANGE');
        } break;
        case 'INIT_AUTH_SUCCESS': {
          _initStatus = action.payload;
          this.emit('CHANGE');
        } break;
        case 'INIT_AUTH_ERROR': {
          _initStatus = false;
          this.emit('CHANGE');
        } break;
        case 'SIGN_OUT_SUCCESS': {
          _userStatus = {
            authenticated: false,
            user: {}
          };
          this.emit('CHANGE');
        } break;
        case 'RECEIVE_USERS': {
          _users = action.payload;
          this.emit('CHANGE');
        } break;
      }
    });
  }

  startListening (cb) {
    this.on('CHANGE', cb);
  }

  stopListening (cb) {
    this.removeListener('CHANGE', cb);
  }

  getUserStatus () {
    return _userStatus;
  }

  getInitStatus () {
    return _initStatus;
  }

  getErrorStatus () {
    return _errorStatus;
  }

  getUsers () {
    return _users;
  }
}

export default new AuthStore();
