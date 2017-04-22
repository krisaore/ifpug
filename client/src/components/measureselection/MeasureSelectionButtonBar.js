import React, { Component } from 'react';

class MeasureSelectionButtonBar extends Component {

  newMeasure() {
    this.props.onNewMeasure();
  }

  render() {
    return (
      <div className="pull-right">
        <button type="button" className="btn btn-primary" onClick={this.newMeasure.bind(this)}>New Measure</button>
      </div>
    );
  }
}

export default MeasureSelectionButtonBar;