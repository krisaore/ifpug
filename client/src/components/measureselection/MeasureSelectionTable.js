import React, { Component } from 'react';
import MeasureSelectionTableRow from './MeasureSelectionTableRow';

class MeasureSelectionTable extends Component {

  render() {
    var rows = [];
    this.props.lines.forEach(function(line) {
	    rows.push(<MeasureSelectionTableRow line={line} row_index={rows.length + 1} key={line.id} />);
    }.bind(this));
    
    return (
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
			      <th>#</th>
            <th>Measure name</th>
            <th>Total FPs</th>
            <th>Creation Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default MeasureSelectionTable;