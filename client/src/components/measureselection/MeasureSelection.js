import React, { Component } from 'react';
import MeasureSelectionTable from './MeasureSelectionTable';
import MeasureSelectionButtonBar from './MeasureSelectionButtonBar';

class MeasureSelection extends Component {

  constructor(){
    super();
      this.state = {
	      lines: [],
      }
  }

  render() {
    return (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="panel-title">
                  <strong className="title">Please select a measure to load:</strong>
                </div>          
              </div>
              <MeasureSelectionTable lines={this.state.lines}/>
            </div>
            <MeasureSelectionButtonBar/>
          </div>
    );
  }
}

export default MeasureSelection;