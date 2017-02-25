import React, { Component } from 'react';
import Table from './components/Table';
import ButtonBar from './components/ButtonBar';
import Navbar from './components/Navbar';
import TitleBar from './components/TitleBar';

import cmplx_data from './resources/CMPLX.json';

import UUID from 'node-uuid';
import _ from 'lodash';


var FP_LINES = [
  {id: UUID.v4(), function_name: 'Funzione prova 1', operation: 'ADD', type: 'ILF', ret_ftr: 2, det: 15, cplx: 'L', ufp: 7, notes: 'few annotations.'},
  {id: UUID.v4(), function_name: 'Funzione prova 2', operation: 'DEL', type: 'EQ', ret_ftr: 3, det: 22, cplx: 'H', ufp: 6, notes: ''},
  {id: UUID.v4(), function_name: 'Funzione prova 3', operation: 'CFP', type: 'EI', ret_ftr: 3, det: 16, cplx: 'H', ufp: 6, notes: 'popolamento iniziale.'}
];

var MEASURE_TITLE = 'My first app measure';

class App extends Component {
  constructor(){
    super();
    this.state = {
      fp_lines: [],
      measure_title: ''
    }
  }
  
  componentWillMount(){
    this.getFPLines();
    this.getMeasureTitle();
  }
  
  getFPLines(){
    this.setState({fp_lines: FP_LINES });
  }
  
  getMeasureTitle() {
	  this.setState({measure_title: MEASURE_TITLE });
  }
  
  calculate(data) {
    var type = data.type;
    var det = data.det;
    var ret_ftr = data.ret_ftr;

    console.log(type);
    console.log(det);
    console.log(ret_ftr);

    console.log(cmplx_data[type]);

    var cmplx = _.filter(cmplx_data[data.type], function(o) {
        /*
        var ret = null;
        console.log(o.det_range);
        if(_.has(o, 'det_range.max')) {
          console.log("esiste max");
          ret = data.det >= o.det_range.min && data.det < o.det_range.max;
        } else {
          console.log("non esiste max");
          ret = data.det >= o.det_range.min;
        }

        return ret;
        */
        // not working
        return (_.has(o, 'det_range.max') ? data.det >= o.det_range.min && data.det < o.det_range.max : data.det >= o.det_range.min)
                ||
               (_.has(o, 'ret_ftr_range.max') ? data.ret_ftr >= o.ret_ftr_range.min && data.ret_ftr < o.ret_ftr_range.max : data.ret_ftr >= o.ret_ftr_range.min)
    });

    console.log(cmplx);

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
  }

  handleChangeLine(id, changed_data){
    let fp_lines = this.state.fp_lines;
    let index = fp_lines.findIndex(x => x.id === id);

    
    changed_data = this.calculate(changed_data);
    fp_lines[index] = changed_data;

    this.setState({fp_lines:fp_lines});
  }
  
  render() {
    return (
      <div className="App">
        <Navbar/>
        <div className="container">
          <TitleBar measure_title={this.state.measure_title}/>
          <Table row_index={this.state.row_index} lines={this.state.fp_lines} onDelLine={this.handleDeleteLine.bind(this)} onChangeLine={this.handleChangeLine.bind(this)}/>
          <ButtonBar onEmptyAdd={this.handleAddEmptyLine.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
