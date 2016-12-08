import React, { Component } from 'react';

export default class Home extends Component {

  render () {
    return (
      <div>
        <div>
          <h3>Welcome to Anime LunchBox</h3>
          <p>
            Anime Lunchbox was created to quickly search for an anime title.
            Search for an anime, check if it's still airing, and
            watch a preview. One may also create an account and save their
            favorite anime or just add to a watchlist.
          </p>
        </div>
        <div className='homeWallPaper' />
      </div>
    );
  }
}
