import React, { Component } from 'react';

class MeasureSelectionTableRow extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.row_index}</td>
        <td>{this.props.line.name}</td>
        <td>{this.props.line.total_fps}</td>
        <td>{this.props.line.created}</td>
        <td className="text-center">
          <span className="fa fa-trash" aria-hidden="true" title="Delete"></span>
        </td>
      </tr>
    );
  }
}

export default MeasureSelectionTableRow;