import React, { Component } from 'react';

class Navbar extends Component {

  onLogout(){
		this.props.onLogout();
  }

  render() {
    return (
		<nav className="navbar navbar-default main_nav">
		  <div className="container-fluid">
				<div className="navbar-header">
				  <a className="navbar-brand" href="#">
						<span><img className="logo" alt="IFPUG App" src={process.env.PUBLIC_URL + '/brand.png'}/>IFPUG App</span>
				  </a>
				</div>
				{this.props.loggedIn &&
				<div className="logout-area pull-right">
						<span className="logged-user"><span className="fa fa-user-circle" aria-hidden="true"></span> {this.props.name}</span>
            <button type="button" className="btn btn-labeled btn-danger" aria-hidden="true" onClick={this.onLogout.bind(this)}>
                <span className="btn-label"><i className="fa fa-sign-out"></i></span>Logout</button>
				</div>
				}
		  </div>
		</nav>
    );
  }
}

export default Navbar;