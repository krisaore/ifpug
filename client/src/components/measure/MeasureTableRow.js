import React, { Component } from 'react';
import MeasureSelectTableCell from './MeasureSelectTableCell';
import MeasureIFPUGEditField from './MeasureIFPUGEditField';
import MeasureLineTitleField from './MeasureLineTitleField';
import MeasureLineNotes from './MeasureLineNotes';

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

class MeasureTableRow extends Component {

  deleteLine(id){
    this.props.onDelLine(id);
  }

  onChangeLine(id, changed_data){
    this.props.onChangeLine(id, changed_data);
  }

  render() {
    return (
      <tr>
        <td className="text-center">{this.props.row_index}</td>
        <td><MeasureLineTitleField name="function_name" line={this.props.line} value={this.props.line.function_name} _id={this.props.line.id} className="hundred_percent" onChange={this.onChangeLine.bind(this)}/></td>
        <td><MeasureSelectTableCell options={OPERATION_OPTIONS} name="operation" line={this.props.line} value={this.props.line.operation} _id={this.props.line.id} onChange={this.onChangeLine.bind(this)}/></td>
        <td><MeasureSelectTableCell options={TYPE_OPTIONS} name="type" line={this.props.line} value={this.props.line.type} _id={this.props.line.id} onChange={this.onChangeLine.bind(this)}/></td>
        <td className="text-center"><MeasureIFPUGEditField name="ret_ftr" line={this.props.line} value={this.props.line.ret_ftr} className="thirty_pixels" _id={this.props.line.id} onChange={this.onChangeLine.bind(this)} /></td>
        <td className="text-center"><MeasureIFPUGEditField name="det" line={this.props.line} value={this.props.line.det} className="thirty_pixels" _id={this.props.line.id} onChange={this.onChangeLine.bind(this)} /></td>
        <td className="text-center">{this.props.line.cplx}</td>
        <td className="text-center">{this.props.line.ufp}</td>
        <td><MeasureLineNotes name="notes" line={this.props.line} value={this.props.line.notes} _id={this.props.line.id} className="hundred_percent" onChange={this.onChangeLine.bind(this)} /></td>
        <td className="text-center" onClick={this.deleteLine.bind(this, this.props.line.id)}>
          <span className="fa fa-trash line_buttons" aria-hidden="true" title="Delete"></span>
        </td>
      </tr>
    );
  }
}

export default MeasureTableRow;