import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
		<nav className="navbar navbar-default main_nav">
		  <div className="container-fluid">
				<div className="navbar-header">
				  <a className="navbar-brand" href="#">
					<span><img className="logo" alt="IFPUG App" src={process.env.PUBLIC_URL + '/brand.png'}/>IFPUG App</span>
				  </a>
				</div>
				<div className="pull-right">
					<div className="btn-toolbar" role="toolbar">
						<div className="btn-group btn-group-lg" role="group">
							<button type="button" className="btn btn-default navbar-btn" aria-label="New" title="New measure"><span className="fa fa-file-text-o" aria-hidden="true"></span></button>
							<button type="button" className="btn btn-info navbar-btn" aria-label="Load" title="Load measure"><span className="fa fa-database" aria-hidden="true"></span></button>
							<button type="button" className="btn btn-success navbar-btn" aria-label="Save" title="Save measure"><span className="fa fa-floppy-o" aria-hidden="true"></span></button>
						</div>
					</div>
				</div>
		  </div>
		</nav>
    );
  }
}

export default Navbar;