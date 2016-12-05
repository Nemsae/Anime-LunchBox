import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _userStatus = {
  authenticated: false,
  user: {}
};
let _errorStatus = 'No User Error';

class AuthStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case 'SIGN_IN_SUCCESS': {
          console.log('SIGNIN SUCCESS: ', action.payload);
          let { uid, email, displayName, photoURL } = action.payload;
          _userStatus = {
            authenticated: true,
            user: { uid, email, displayName, photoURL }
          }
          this.emit('CHANGE');
        } break;
        case 'INIT_AUTH_ERROR': {
          console.log('AUTH ERROR: ', action.payload)
          _errorStatus = action.payload;
          this.emit('CHANGE');
        } break;
        case 'SIGN_OUT_SUCCESS': {
          _userStatus = {
            authenticated: false,
            user: {}
          };
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

  getErrorStatus () {
    return _errorStatus;
  }
}

export default new AuthStore();
