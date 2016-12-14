import React, { Component } from 'react';
import { signUpuser } from '../actions/AuthActions';
import { signUpUser } from '../actions/AuthActions';


export default class SignUp extends Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm (e) {
    e.preventDefault();
    const target = e.target;
    const userInfo = {
      userName: target.userName.value,
      email: target.email.value,
      password: target.password.value,
      confirmPassword: target.confirmPassword.value,
    }
    console.log('userInfo:', userInfo);

    signUpUser(userInfo);
  }

  render() {
    return(
      <form onSubmit={this.submitForm}>
        <label htmlFor="userName"></label>
        <input type="text" name="userName" />
        <label htmlFor="email"></label>
        <input type="text" name="email" />
        <label htmlFor="password"></label>
        <input type="text" name="password"/>
        <label htmlFor="confirmPassword"></label>
        <input type="text" name="confirmPassword"/>
        <button>Create Account</button>
      </form>
    );
  }
}
