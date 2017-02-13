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
  
  render() {
    return (
      <div className="App">
		<Navbar/>
		<div className="container">
			<TitleBar measure_title={this.state.measure_title}/>
			<Table lines={this.state.fp_lines} />
			<ButtonBar/>
		</div>
      </div>
    );
  }
}

export default App;
