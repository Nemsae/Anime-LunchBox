import React, { Component } from 'react';
import { Link } from 'react-router';
import AnimeStore from '../stores/AnimeStore';
import NavBar from './NavBar';
// import SignInModal from './SignInModal';


export default class Layout extends Component {
  constructor () {
    super();

    this.state = {
      stickers: AnimeStore.getStickers()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    AnimeStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    AnimeStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      stickers: AnimeStore.getStickers()
    });
  }
  render () {

    let { stickers } = this.state;

    return (
      <div className='mainContainer'>
        <div>
          <NavBar />
        </div>
        <div className='pageContainer'>
          {/* <SignInModal /> */}
          {this.props.children}
        </div>

      </div>
    );
  }
}
