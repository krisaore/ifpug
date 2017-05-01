import React, { Component } from 'react';
import MeasureTableRow from './MeasureTableRow';

class MeasureTable extends Component {

  deleteLine(id){
    this.props.onDelLine(id);
  }

  onChangeLine(id, changed_data) {
    this.props.onChangeLine(id, changed_data);
  }
  
  render() {
    var rows = [];
    this.props.lines.forEach(function(line) {
	    rows.push(<MeasureTableRow line={line} row_index={rows.length + 1} key={line.id} onDelLine={this.deleteLine.bind(this)} onChangeLine={this.onChangeLine.bind(this)}/>);
    }.bind(this));
    
    return (
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
			      <th className="text-center">#</th>
            <th className="twentyfive_percent">Function name</th>
            <th>Operation</th>
            <th>Type</th>
            <th>RET/FTR</th>
            <th>DET</th>
            <th>Complexity</th>
            <th>UFP</th>
            <th className="thirty_percent">Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default MeasureTable;