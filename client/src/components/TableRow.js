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

  deleteLine(id){
    this.props.onDelLine(id);
  }

  render() {
    return (
      <tr>
        <td>{this.props.line.id}</td>
        <td><input type="text" defaultValue={this.props.line.function_name} className="hundred_percent"/></td>
        <SelectTableCell options={OPERATION_OPTIONS} value={this.props.line.operation} />
        <SelectTableCell options={TYPE_OPTIONS} value={this.props.line.type} />
        <td className="text-center"><input type="text" defaultValue={this.props.line.ret_ftr} className="thirty_pixels" /></td>
        <td className="text-center"><input type="text" defaultValue={this.props.line.det} className="thirty_pixels" /></td>
        <td className="text-center">{this.props.line.cplx}</td>
        <td className="text-center">{this.props.line.ufp}</td>
        <td><input type="text" defaultValue={this.props.line.notes} className="hundred_percent" /></td>
        <td className="text-center" onClick={this.deleteLine.bind(this, this.props.line.id)}><span className="fa fa-times-circle" aria-hidden="true" title="Delete"></span></td>
      </tr>
    );
  }
}

export default TableRow;