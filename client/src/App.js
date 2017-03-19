import React, { Component } from 'react';
import UUID from 'node-uuid';
import _ from 'lodash';

import Table from './components/Table';
import ButtonBar from './components/ButtonBar';
import Navbar from './components/Navbar';
import LoginRegister from './components/LoginRegister';

import cmplx_data from './resources/CMPLX.json';
import ufp_data from './resources/UFP.json';

class App extends Component {
  constructor(){
    super();
    this.state = {
      fp_lines: [],
      measure_title: '',
      total_fps: 0,
      isLoggedIn: false,
      loadedMeasure: true,
      jwt_token: ''
    }
  }
  
  componentDidMount(){
    this.getDatas();
  }
  
  getDatas(){
    var _that = this;
    fetch('/api/data', {
      method: 'get'
    }).then(function(response) {
      response.json().then(function(json) {
        _that.setState({measure_title: json.MEASURE_TITLE, fp_lines: json.FP_LINES });    
        _that.getTotalFPS();       
      }).catch(function(err) {
        // Error :()
      });    
    }).catch(function(err) {
      // Error :(
    });
  }

  login() {
    console.log('entrato');
    var _that = this;
    fetch('/api/authenticate', {
      method: 'post'
    }).then(function(response) {
      response.json().then(function(json) {
        if(json.success) {
          console.log('entrato');
          _that.setState({isLoggedIn: true, jwt_token: json.token });
        }
      }).catch(function(err) {
        // Error :()
        console.log(err);
      });    
    }).catch(function(err) {
      // Error :(
      console.log(err);
    });
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
		  {id: UUID.v4(), function_name: '', operation: 'ADD', type: 'ILF', ret_ftr: '', det: '', cplx: 'L', ufp: '', notes: ''}
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
        <Navbar loggedIn={this.state.isLoggedIn}/>
        {this.state.isLoggedIn && this.state.loadedMeasure &&
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="panel-title pull-left seventy_percent">
                  <strong className="title">Measure name: </strong><input type="text" className="fifty_percent" defaultValue={this.state.measure_title} placeholder="Please enter a name." />
                </div>
                <div className="panel-title pull-right">
                  <button type="button" className="btn btn-info first_button" aria-label="Config" title="Configuration"><span className="fa fa-cog" aria-hidden="true"></span></button>
                  <button type="button" className="btn btn-danger" aria-label="Close" title="Close measure"><span className="fa fa-times-circle-o" aria-hidden="true"></span></button>
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
        }
        {this.state.isLoggedIn && !this.state.loadedMeasure &&
          <div>Misura non caricata</div>
        }        
        {!this.state.isLoggedIn &&
          <LoginRegister onLogin={this.login.bind(this)}/>
        }     
      </div>      
    );
  }
}

export default App;