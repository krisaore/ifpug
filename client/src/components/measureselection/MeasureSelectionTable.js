import React, { Component } from 'react';
import MeasureSelectionTableRow from './MeasureSelectionTableRow';

class MeasureSelectionTable extends Component {

  deleteLine(id){
    this.props.onDelLine(id);
  }

  render() {
    var rows = [];
    this.props.lines.forEach(function(line) {
	    rows.push(<MeasureSelectionTableRow line={line} row_index={rows.length + 1} key={line._id} onDelLine={this.deleteLine.bind(this)}/>);
    }.bind(this));
    
    return (
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
			      <th className="text-center">#</th>
            <th>Measure name</th>
            <th>Total FPs</th>
            <th>Creation Date</th>
            <th>Last Update Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default MeasureSelectionTable;