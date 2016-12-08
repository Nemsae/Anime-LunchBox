import AppDispatcher from '../AppDispatcher';

const FirebaseRTDBActions = {
  receiveUsers (users) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_USERS',
      payload: users
    });
  }
};

export FirebaseRTDBActions;
