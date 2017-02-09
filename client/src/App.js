import React, { Component } from 'react';
import Table from './components/Table';

var FP_LINES = [
  {id: 1, function_name: 'Funzione prova 1', operation: 'ADD', type: 'ILF', ret_ftr: 2, det: 15, cplx: 'L', ufp: 7, notes: 'few annotations.'},
  {id: 2, function_name: 'Funzione prova 2', operation: 'DEL', type: 'EQ', ret_ftr: 3, det: 22, cplx: 'H', ufp: 6, notes: ''},
  {id: 3, function_name: 'Funzione prova 3', operation: 'CFP', type: 'EI', ret_ftr: 3, det: 22, cplx: 'H', ufp: 6, notes: 'popolamento iniziale.'}
];

class App extends Component {
  render() {
    return (
      <div className="App">
		<Table lines={FP_LINES} />
      </div>
    );
  }
}

export default App;
