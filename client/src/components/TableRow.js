import React, { Component } from 'react';
import SelectTableCell from './SelectTableCell';
import IFPUGEditField from './IFPUGEditField';

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

  onChangeLine(id, changed_data){
    console.log(id);
    console.log(changed_data);
    this.props.onChangeLine(id, changed_data);
  }

  render() {
    return (
      <tr>
        <td>{this.props.row_index}</td>
        <td><input type="text" defaultValue={this.props.line.function_name} className="hundred_percent"/></td>
        <SelectTableCell options={OPERATION_OPTIONS} value={this.props.line.operation} _id={this.props.line.id} onChangeLine={this.onChangeLine.bind(this)}/>
        <SelectTableCell options={TYPE_OPTIONS} value={this.props.line.type} _id={this.props.line.id} onChangeLine={this.onChangeLine.bind(this)}/>
        <td className="text-center"><IFPUGEditField name="det" line={this.props.line} value={this.props.line.ret_ftr} className="thirty_pixels" _id={this.props.line.id} onChange={this.onChangeLine.bind(this)} /></td>
        <td className="text-center"><IFPUGEditField name="det" line={this.props.line} value={this.props.line.det} className="thirty_pixels" _id={this.props.line.id} onChange={this.onChangeLine.bind(this)} /></td>
        <td className="text-center">{this.props.line.cplx}</td>
        <td className="text-center">{this.props.line.ufp}</td>
        <td><input type="text" defaultValue={this.props.line.notes} className="hundred_percent" /></td>
        <td className="text-center" onClick={this.deleteLine.bind(this, this.props.line.id)}>
          <span className="fa fa-trash" aria-hidden="true" title="Delete"></span>
        </td>
      </tr>
    );
  }
}

export default TableRow;