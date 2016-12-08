import React, { Component } from 'react';

export default class Home extends Component {
  render () {
    return (
      <div className="componentContainer">
        <div className="homeContainer">
          <div className="animeIntroContainer">
            <h3 className="text-center animeIntroTitle">Welcome to Anime LunchBox</h3>
            <p className="animeIntroContent">
              Add anime to your Anime Lunchbox by adding to favorites and watchlist!
              Curious to know if an anime is still airing? Or maybe if you saw every
              episode of a specific anime? Find out by using Anime Lunchbox!
              With Anime Lunchbox you can see if an anime is still airing,
              the number of episodes available, genres, or watch a preview of an anime.
            </p>
          </div>
          <div className='homeWallPaper' />
        </div>
      </div>
    );
  }
}
