import React, { Component } from 'react';
import TableRow from './TableRow';

class Table extends Component {

  deleteLine(id){
    this.props.onDelLine(id);
  }
  
  render() {
    var rows = [];
    this.props.lines.forEach(function(line) {
	  rows.push(<TableRow line={line} key={line.id} onDelLine={this.deleteLine.bind(this, line.id)} />);
    }.bind(this));	  
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
			<th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default Table;