import React, { Component } from 'react';
import { signUpuser } from '../actions/AuthActions';

export default class SignUp extends Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.state = {
      errors: '',
    }
  }

  validateForm(values) {
    const errors = {};

    if (!values.email) {
      errors.email = 'Please enter an email.';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Please enter a password.';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please enter a password confirmation.';
    }
    if (values.password !== values.confirmPassword) {
      errors.password = 'Passwords do not match';
    }
    console.log('errors:', errors);
    this.setState({
      errors: errors,
    });

    return errors;
  };

  submitForm (e) {
    e.preventDefault();
    const target = e.target;
    const userInfo = {
      // userName: target.userName.value,
      email: target.email.value,
      password: target.password.value,
      confirmPassword: target.confirmPassword.value,
    }

    let createAccount = new Promise ((resolve, reject) => {
      resolve(this.validateForm(userInfo));
    });
    createAccount.then( res => {
    let verified = !Object.keys(res).length ? true : false;
    //  verified && signUpUser(userInfo);
     if (verified) {
       signUpUser(userInfo);
       target.email.value = "";
       target.password.value = "";
       target.confirmPassword.value = "";
     }
    })
    .catch(err => {
      console.log('err:', err);
    })
  }

  render() {
    const { errors } = this.state;
    return(
      <div className="signUpFormContainer">
        <h2 className="text-center">Create an Account</h2>
        <form onSubmit={this.submitForm} className="signUpForm">
          {/* <label htmlFor="userName">Username</label> */}
          {/* <input type="text" name="userName" required/> */}
          <label htmlFor="email">Email</label>
          <div className="formError">{errors.email}</div>
          <input type="email" name="email" required/>
          <label htmlFor="password">Password</label>
          <div className="formError">{errors.password}</div>
          <input type="text" minLength="6" name="password" required />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="formError">{errors.password}</div>
          <div className="formError">{errors.confirmPassword}</div>
          <input type="text" minLength="6" name="confirmPassword" required />
          <button>Create Account</button>
        </form>
      </div>

    );
  }
}
