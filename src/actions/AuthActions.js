import AppDispatcher from '../AppDispatcher';
import firebase from 'firebase';
import { firebaseAuth } from '../firebase';

export function signInWithGoogle () {
  const provider = new firebase.auth.GoogleAuthProvider();
  console.log('provider: ', provider);
  console.log('authenticate: ', authenticate);
  return authenticate(provider);
}

function authenticate (provider) {
  // return (dispatch) => {
    firebaseAuth.signInWithPopup(provider)
      .then((result) => {
        console.log('result: ', result);
        console.log('AuthActions: ', AuthActions);
        AuthActions.signInSuccess(result);
      })
      .catch((err) => AuthActions.signInError(err));
  // };
}

export function signOut () {
  return (dispatch) => {
    firebaseAuth.signOut()
      .then(() => AuthActions.signOutSuccess());
  };
}

export function initAuth (dispatch) {
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged(
      (user) => {
        if (user) {
          AuthActions.initAuthSuccess(user);
        }
        unsub();
        resolve();
      },
      (error) => {
        // dispatch(initAuthError(error));
        // reject(error);
        resolve();
      });
  });
}

export const AuthActions = {
  initAuthSuccess (user) {
    AppDispatcher.dispatch({
      type: 'INIT_AUTH_SUCCESS',
      payload: user
    });
  },

  initAuthError (err) {
    AppDispatcher.dispatch({
      type: 'INIT_AUTH_ERROR',
      payload: err
    });
  },

  signInSuccess (result) {
    console.log('result2222: ', result);
    AppDispatcher.dispatch({
      type: 'SIGN_IN_SUCCESS',
      payload: result.user
    });
  },

  signOutSuccess () {
    AppDispatcher.dispatch({
      type: 'SIGN_OUT_SUCCESS'
    });
  },

  signInError (err) {
    AppDispatcher.dispatch({
      type: 'SIGN_IN_ERROR',
      payload: err
    });
  }
};
