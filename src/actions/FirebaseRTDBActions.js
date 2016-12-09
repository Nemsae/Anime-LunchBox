import AppDispatcher from '../AppDispatcher';
import firebase from 'firebase';
import { firebaseAuth, firebaseDb } from '../firebase';

const FirebaseRTDBActions = {
  receiveUsers (users) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_USERS',
      payload: users
    });
  }
};

export FirebaseRTDBActions;
