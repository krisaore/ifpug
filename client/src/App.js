import React, { Component } from 'react';
import UUID from 'node-uuid';
import _ from 'lodash';

import Table from './components/Table';
import ButtonBar from './components/ButtonBar';
import Navbar from './components/Navbar';

import cmplx_data from './resources/CMPLX.json';
import ufp_data from './resources/UFP.json';

var FP_LINES = [
  {id: UUID.v4(), function_name: 'Funzione prova 1', operation: 'ADD', type: 'ILF', ret_ftr: 2, det: 15, cplx: 'L', ufp: 7, notes: 'few annotations.'},
  {id: UUID.v4(), function_name: 'Funzione prova 2', operation: 'DEL', type: 'EQ', ret_ftr: 33, det: 22, cplx: 'H', ufp: 6, notes: ''},
  {id: UUID.v4(), function_name: 'Funzione prova 3', operation: 'CFP', type: 'EI', ret_ftr: 3, det: 16, cplx: 'H', ufp: 6, notes: 'popolamento iniziale.'}
];

var MEASURE_TITLE = 'My first app measure';

class App extends Component {
  constructor(){
    super();
    this.state = {
      fp_lines: [],
      measure_title: '',
      total_fps: 0
    }
  }
  
  componentWillMount(){
    this.getFPLines();
    this.getMeasureTitle();
  }

  componentDidMount() {
    this.getTotalFPS();
  }
  
  getFPLines(){
    this.setState({fp_lines: FP_LINES });
  }
  
  getMeasureTitle() {
	  this.setState({measure_title: MEASURE_TITLE });
  }

  getTotalFPS() {
    var total = _.sumBy(this.state.fp_lines, function(o) { return o.ufp; });
    this.setState({total_fps: total });
  }
  
  calculate(data) {
    var filteredData = _.find(cmplx_data[data.type], function(o) {
        return (_.has(o, 'det_range.max') ? _.inRange(data.det, o.det_range.min, o.det_range.max) : _.inRange(data.det, o.det_range.min, Infinity))
                &&
               (_.has(o, 'ret_ftr_range.max') ? _.inRange(data.ret_ftr, o.ret_ftr_range.min, o.ret_ftr_range.max) : _.inRange(data.ret_ftr, o.ret_ftr_range.min, Infinity));
    });

    var cmplx = _.isUndefined(filteredData) ? 'L' : filteredData.cmplx;
    var ufp = _.head(_.filter(ufp_data["UFP"], function(o){
      return o.type === data.type;
    })).cmplx[cmplx];

    data.cplx = cmplx;
    data.ufp = parseInt(ufp, 10);

	  return data;
  }
  
  handleAddEmptyLine(){
    let fp_lines = this.state.fp_lines;
    fp_lines.push(
		  {id: UUID.v4(), function_name: '', operation: '', type: '', ret_ftr: '', det: '', cplx: 'L', ufp: '', notes: ''}
	  );
    this.setState({fp_lines:fp_lines});
  }
  
  handleDeleteLine(id){
    let fp_lines = this.state.fp_lines;
    let index = fp_lines.findIndex(x => x.id === id);
    fp_lines.splice(index, 1);
    this.setState({fp_lines:fp_lines});
    this.getTotalFPS();
  }

  handleChangeLine(id, changed_data){
    let fp_lines = this.state.fp_lines;
    let index = fp_lines.findIndex(x => x.id === id);

    changed_data = this.calculate(changed_data);
    fp_lines[index] = changed_data;

    this.setState({fp_lines:fp_lines});
    this.getTotalFPS();
  }
  
  render() {
    return (
      <div className="App">
        <Navbar/>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="panel-title pull-left seventy_percent">
                <strong className="title">Measure name: </strong><input type="text" className="fifty_percent" defaultValue={this.state.measure_title} placeholder="Please enter a name." />
              </div>
              <div className="panel-title pull-right">
                <button type="button" className="btn btn-default" aria-label="Config" title="Configuration"><span className="fa fa-cog" aria-hidden="true"></span></button>
              </div>
              <div className="clearfix"></div>            
            </div>
            <div className="panel-body">
              <p className="text-center ufp">Total UFP: {this.state.total_fps}</p>
            </div>
            <Table row_index={this.state.row_index} lines={this.state.fp_lines} onDelLine={this.handleDeleteLine.bind(this)} onChangeLine={this.handleChangeLine.bind(this)}/>
          </div>
          <ButtonBar onEmptyAdd={this.handleAddEmptyLine.bind(this)}/>
        </div>
      </div>      
    );
  }
}

export default App;
