import React, { Component } from 'react';
import { Link } from 'react-router';
import { MuiThemeProvider } from 'material-ui';

export default class Layout extends Component {
  render () {
    return (
      <div className="mainContainer">
         <div className="navbar navbar-inverse navbar-fixed-left">
           <ul className="nav navbar-nav">
             <li>Anime<br/>LunchBox</li>
             <li><Link to='/'>Home</Link></li>
             <li><Link to='/search'>Search</Link><img/></li>
             <li><Link to='/favorites'>Favorites</Link><img/></li>
             <li><Link to='/watchList'>WatchList</Link><img/></li>
           </ul>
         </div>
       <div className="container">
          <div>
          <div className='pageContainer'>
            {this.props.children}
          </div>
          </div>
         </div>

       </div>
    )
  }
};
