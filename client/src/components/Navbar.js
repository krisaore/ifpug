import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
		<nav className="navbar navbar-default">
		  <div className="container-fluid">
			<div className="navbar-header">
			  <a className="navbar-brand" href="#">IFPUG App</a>
			</div>
			<div className="pull-right">
				<div className="btn-toolbar" role="toolbar">
					<div className="btn-group btn-group-lg" role="group">
						<button type="button" className="btn btn-default navbar-btn" aria-label="Load" title="Load measure"><span className="fa fa-database" aria-hidden="true"></span></button>
						<button type="button" className="btn btn-default navbar-btn" aria-label="Save" title="Save measure"><span className="fa fa-floppy-o" aria-hidden="true"></span></button>
						<button type="button" className="btn btn-default navbar-btn" aria-label="Config" title="Configuration"><span className="fa fa-cog" aria-hidden="true"></span></button>
					</div>
				</div>
			</div>
		  </div>
		</nav>
    );
  }
}

export default Navbar;