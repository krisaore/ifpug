import React, { Component } from 'react';
import Table from './components/Table';
import ButtonBar from './components/ButtonBar';
import Navbar from './components/Navbar';
import TitleBar from './components/TitleBar';

var FP_LINES = [
  {id: 1, function_name: 'Funzione prova 1', operation: 'ADD', type: 'ILF', ret_ftr: 2, det: 15, cplx: 'L', ufp: 7, notes: 'few annotations.'},
  {id: 2, function_name: 'Funzione prova 2', operation: 'DEL', type: 'EQ', ret_ftr: 3, det: 22, cplx: 'H', ufp: 6, notes: ''},
  {id: 3, function_name: 'Funzione prova 3', operation: 'CFP', type: 'EI', ret_ftr: 3, det: 22, cplx: 'H', ufp: 6, notes: 'popolamento iniziale.'}
];

var MEASURE_TITLE = 'My first app measure';

class App extends Component {
  constructor(){
    super();
    this.state = {
      fp_lines: [],
      measure_title: ''
    }
	
	this.handleAddEmptyLine = this.handleAddEmptyLine.bind(this);
	this.handleDeleteLine = this.handleDeleteLine.bind(this);
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
    fp_lines.push([
		{id: 0, function_name: '', operation: '', type: '', ret_ftr: '', det: '', cplx: 'L', ufp: '', notes: ''},
	]);
    this.setState({fp_lines:fp_lines});
  }
  
  handleDeleteLine(id){
    let fp_lines = this.state.fp_lines;
    let index = fp_lines.findIndex(x => x.id === id);
    fp_lines.splice(index, 1);
    this.setState({fp_lines:fp_lines});
  }
  
  render() {
    return (
      <div className="App">
		<Navbar/>
		<div className="container">
			<TitleBar measure_title={this.state.measure_title}/>
			<Table lines={this.state.fp_lines} onDelLine={this.handleDeleteLine}/>
			<ButtonBar onEmptyAdd={this.handleAddEmptyLine}/>
		</div>
      </div>
    );
  }
}

export default App;
