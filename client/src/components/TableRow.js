import React, { Component } from 'react';
import SelectTableCell from './SelectTableCell';

var OPERATION_OPTIONS = [
  {id: 1, value: 'ADD'},
  {id: 2, value: 'CHG'},
  {id: 3, value: 'DEL'},
  {id: 4, value: 'CFP'}
];

var TYPE_OPTIONS = [
  {id: 1, value: 'ILF'},
  {id: 2, value: 'EIF'},
  {id: 3, value: 'EQ'},
  {id: 4, value: 'EO'},
  {id: 5, value: 'EI'}  
];

class TableRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.line.id}</td>
		<td>{this.props.line.function_name}</td>
        <SelectTableCell options={OPERATION_OPTIONS} value={this.props.line.operation} />
		<SelectTableCell options={TYPE_OPTIONS} value={this.props.line.type} />
		<td>{this.props.line.ret_ftr}</td>
		<td>{this.props.line.det}</td>
		<td>{this.props.line.cplx}</td>
		<td>{this.props.line.ufp}</td>
		<td>{this.props.line.notes}</td>
      </tr>
    );
  }
}

export default TableRow;