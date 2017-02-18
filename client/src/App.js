import React, { Component } from 'react';
import Table from './components/Table';
import ButtonBar from './components/ButtonBar';
import Navbar from './components/Navbar';
import TitleBar from './components/TitleBar';
import UUID from 'node-uuid';

var FP_LINES = [
  {id: UUID.v4(), function_name: 'Funzione prova 1', operation: 'ADD', type: 'ILF', ret_ftr: 2, det: 15, cplx: 'L', ufp: 7, notes: 'few annotations.'},
  {id: UUID.v4(), function_name: 'Funzione prova 2', operation: 'DEL', type: 'EQ', ret_ftr: 3, det: 22, cplx: 'H', ufp: 6, notes: ''},
  {id: UUID.v4(), function_name: 'Funzione prova 3', operation: 'CFP', type: 'EI', ret_ftr: 3, det: 22, cplx: 'H', ufp: 6, notes: 'popolamento iniziale.'}
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

  handleChangeLine(id){
    let fp_lines = this.state.fp_lines;
    let index = fp_lines.findIndex(x => x.id === id);


    fp_lines[index].ufp = '6';
    fp_lines[index].cplx = 'M';
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
