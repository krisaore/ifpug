import React, { Component } from 'react';

class MeasureSelectionButtonBar extends Component {
  render() {
    return (
      <div className="pull-right">
        <button type="button" className="btn btn-primary">New Measure</button>
      </div>
    );
  }
}

export default MeasureSelectionButtonBar;