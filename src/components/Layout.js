import React, { Component } from 'react';
import NavBar from './NavBar';

export default function Layout(props) {
    return (
      <div className='layoutContainer'>
        <NavBar />
        {props.children}
      </div>
    );
  }
