import React, { Component } from 'react';

class ButtonBar extends Component {
  render() {
    return (
		<div className="container">
		  <div className="row">
			<div className="col-md-12">
				<div className="pull-right">
					<button type="button" className="btn btn-primary btn-circle btn-lg"><i className="glyphicon glyphicon-plus"></i></button>
				</div>
			</div>
		  </div>
		</div>
    );
  }
}

export default ButtonBar;