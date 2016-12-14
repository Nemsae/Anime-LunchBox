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
    // console.log('userInfo:', userInfo);

    signUpUser(userInfo);
  }

  render() {
    return(
      <div className="signUpFormContainer">
        <h2 className="text-center">Create an Account</h2>
        <form onSubmit={this.submitForm} className="signUpForm">
          <label htmlFor="userName">Username</label>
          <input type="text" name="userName" />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
          <label htmlFor="password">Password</label>
          <input type="text" name="password"/>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="text" name="confirmPassword"/>
          <button>Create Account</button>
        </form>
      </div>

    );
  }
}
