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

var lineClassName = undefined;
var disableButtonClassName = undefined;

class MeasureTableRow extends Component {

  constructor(){
    super();
    this.state = {
      isDisabled: undefined
    }
  }

  componentDidMount() {
    this.setState({isDisabled: this.props.line.disabled});
  }

  toggleDisableLine(line_data) {
    if (parseInt(this.state.isDisabled, 10) === 1) {
      this.setState({isDisabled: 0});
      line_data['disabled'] = "0";      
    } else {
      this.setState({isDisabled: 1});
      line_data['disabled'] = "1";
    }
    this.onChangeLine(line_data.id, line_data);
  }

  deleteLine(id){
    this.props.onDelLine(id);
  }

  onChangeLine(id, changed_data){
    this.props.onChangeLine(id, changed_data);
  }

  render() {

    if (parseInt(this.state.isDisabled, 10) === 1) {
      lineClassName = 'disabled_row';
      disableButtonClassName = 'fa fa-eye line_buttons';
    } else {
      lineClassName = '';
      disableButtonClassName = 'fa fa-eye-slash line_buttons';
    }

    return (
      <tr className={lineClassName} ref="row">
        <td className="text-center">{this.props.row_index}</td>
        <td><MeasureLineTitleField name="function_name" line={this.props.line} value={this.props.line.function_name} _id={this.props.line.id} className="hundred_percent" onChange={this.onChangeLine.bind(this)}/></td>
        <td><MeasureSelectTableCell options={OPERATION_OPTIONS} name="operation" line={this.props.line} value={this.props.line.operation} _id={this.props.line.id} onChange={this.onChangeLine.bind(this)}/></td>
        <td><MeasureSelectTableCell options={TYPE_OPTIONS} name="type" line={this.props.line} value={this.props.line.type} _id={this.props.line.id} onChange={this.onChangeLine.bind(this)}/></td>
        <td className="text-center"><MeasureIFPUGEditField name="ret_ftr" line={this.props.line} value={this.props.line.ret_ftr} className="thirty_pixels" _id={this.props.line.id} onChange={this.onChangeLine.bind(this)} /></td>
        <td className="text-center"><MeasureIFPUGEditField name="det" line={this.props.line} value={this.props.line.det} className="thirty_pixels" _id={this.props.line.id} onChange={this.onChangeLine.bind(this)} /></td>
        <td className="text-center">{this.props.line.cplx}</td>
        <td className="text-center">{this.props.line.ufp}</td>
        <td><MeasureLineNotes name="notes" line={this.props.line} value={this.props.line.notes} _id={this.props.line.id} className="hundred_percent" onChange={this.onChangeLine.bind(this)} /></td>
        <td className="text-center">
          <span className={disableButtonClassName} aria-hidden="true" title="Disable" onClick={this.toggleDisableLine.bind(this, this.props.line)}></span>
          <span className="fa fa-trash-o" aria-hidden="true" title="Delete" onClick={this.deleteLine.bind(this, this.props.line.id)}></span>
        </td>     
      </tr>
    );
  }
}

export default MeasureTableRow;