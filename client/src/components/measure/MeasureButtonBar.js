import React, { Component } from 'react';

class MeasureButtonBar extends Component {
  addEmptyLine(){
    this.props.onEmptyAdd();
  }
	
  render() {
    return (
      <div className="pull-right">
        <button type="button" className="btn btn-primary btn-circle btn-lg" onClick={this.addEmptyLine.bind(this)}><i className="fa fa-plus"></i></button>
      </div>
    );
  }
}

export default MeasureButtonBar;