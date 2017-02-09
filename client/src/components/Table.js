import React, { Component } from 'react';
import TableRow from './TableRow';

class Table extends Component {
  render() {
    var rows = [];
    this.props.lines.forEach(function(line) {
      rows.push(<TableRow line={line} key={line.id} />);
    });	  
    return (
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
			<th>#</th>
            <th>Function</th>
            <th>Operation</th>
            <th>Type</th>
            <th>RET/FTR</th>
            <th>DET</th>
            <th>Complexity</th>
			<th>UFP</th>
			<th>Notes</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default Table;