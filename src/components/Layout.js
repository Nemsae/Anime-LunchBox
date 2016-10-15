import React, { Component } from 'react';
import { Link } from 'react-router';
import { MuiThemeProvider } from 'material-ui';

export default class Layout extends Component {
  render() {
    return (
       <div>
          <div className="container-fluid">
          <div className="row">
          <div className="col-sm-3 col-lg-2">
          <nav className="navbar navbar-fixed-side fullNavBar">
             <div className="navbar-header">
               <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                 <span className="icon-bar"></span>
                 <span className="icon-bar"></span>
                 <span className="icon-bar"></span>
               </button>
               <Link to='/' className="navbar-brand" href="#">home</Link>
             </div>
             <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
               <ul className="nav navbar-nav navbar-right">
                 <li><Link to='/search'>Search</Link></li>
                 <li><Link to='/favorites'>Favorites</Link></li>
                 <li><Link to='/watchList'>WatchList</Link></li>
               </ul>
             </div>
             </nav>
             </div>
             </div>
           </div>
         {this.props.children}
       </div>
    )
  }
};
