import React, { Component } from 'react';

class TitleBar extends Component {
  render() {
    return (
      <div className="container-fluid">
		    <div className="pull-left">
          <h4>Measure: <input type="text" defaultValue={this.props.measure_title} placeholder="Please enter a name." /></h4>
        </div>
        <div className="pull-right">
          <button type="button" className="btn btn-default" aria-label="Config" title="Configuration"><span className="fa fa-cog" aria-hidden="true"></span></button>
        </div>        
      </div>
    );
  }
}

export default TitleBar;