import AppDispatcher from '../AppDispatcher';
import firebase from 'firebase';
import { firebaseAuth, firebaseDb } from '../firebase';

export function signInWithGoogle () {
  const provider = new firebase.auth.GoogleAuthProvider();
  return authenticate(provider);
}

export function signUpUser (newUser) {
    // Handle Errors here.

console.log('newUser:', newUser);

     firebaseAuth.createUserWithEmailAndPassword(newUser.email, newUser.password)
       .then(response => {
         console.log('newUser.email:', newUser.email);
         firebaseAuth.signInWithEmailAndPassword(newUser.email, newUser.password)
        //  setUserRef(response.uid);
         })
       .then(response => {

        //  dispatch (authUser());
       })
       .catch(error => {
         console.log('error: ', error);
        //  dispatch(authError(error));
       });
    }
// }

// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//   var errorCode = error.code;
//   var errorMessage = error.message;
// });


function authenticate (provider) {
  firebaseAuth.signInWithPopup(provider)
  .then((result) => {
    // console.log('result000: ', result);

    let userId = result.user.uid;
    let displayName = result.user.displayName;
    let email = result.user.email;
    let photoURL = result.user.photoURL;

    const usersRef = firebaseDb.ref('users');

    usersRef.on('value', (snap) => {
      let users = snap.val();

      // if (users[`users/${userId}`]) {
      if (users[userId]) {
        console.log('Node Exists');
      } else {
        console.log('Create Node');
        console.log('users/userId: ', `users/${userId}`);
        firebaseDb.ref('users/' + userId).set({
          displayName,
          email,
          photoURL
        });
      }
      console.log('userNode in actions:1 ', users);
      // AuthStore.getUsers(users);
      return;
    });

    AuthActions.signInSuccess(result);
    initAuth();
  })
  .catch((err) => AuthActions.signInError(err));
}

export function signOut () {
  // console.log('sign out clicked');
  firebaseAuth.signOut()
  .then(() => AuthActions.signOutSuccess())
  .then(() => AuthActions.initAuthError());
}

export function initAuth (dispatch) {
  // console.log('Sanity:Running initAuth ');
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged(
      (user) => {
        // console.log('initAuth:1', user);
        if (user) {
          // console.log('user of initAuth: ', user);
          AuthActions.initAuthSuccess(user);
        } else {
          AuthActions.initAuthError();
        }
        unsub();
        resolve();
      },
      (error) => {
        // console.log('initAuth:2 error');
        // console.log('error of initAuth: ', error);
        AuthActions.initAuthError(error);
        reject(error);
        // resolve();
      }
    );
  });
}

export const AuthActions = {
  initAuthSuccess (user) {
    // console.log('user of initAuthSuccess: ', user);
    AppDispatcher.dispatch({
      type: 'INIT_AUTH_SUCCESS',
      payload: user
    });
  },

  initAuthError () {
    AppDispatcher.dispatch({
      type: 'INIT_AUTH_ERROR'
    });
  },
  //
  // initAuthError (err) {
  //   AppDispatcher.dispatch({
  //     type: 'INIT_AUTH_ERROR',
  //     payload: err
  //   });
  // },

  signInSuccess (result) {
    // console.log('result2222: ', result);
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
