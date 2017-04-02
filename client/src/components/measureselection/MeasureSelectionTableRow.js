import React, { Component } from 'react';
import moment from 'moment';

class MeasureSelectionTableRow extends Component {

  deleteLine(id){
    this.props.onDelLine(id);
  }

  loadMeasure(id) {
    this.props.onLoadMeasure(id);
  }

  render() {
    return (
      <tr>
        <td className="text-center">{this.props.row_index}</td>
        <td className="forty_percent">{this.props.line.name}</td>
        <td>{this.props.line.total_fps}</td>
        <td>{moment(this.props.line.created).format('L')}</td>
        <td>{moment(this.props.line.updated).format('L')}</td>
        <td className="text-center">
          <span className="fa fa-pencil line_buttons" aria-hidden="true" title="Modify" onClick={this.loadMeasure.bind(this, this.props.line._id)}></span>
          <span className="fa fa-trash line_buttons" aria-hidden="true" title="Delete" onClick={this.deleteLine.bind(this, this.props.line._id)}></span>
        </td>
      </tr>
    );
  }
}

export default MeasureSelectionTableRow;