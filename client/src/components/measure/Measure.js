import React, { Component } from 'react';
import UUID from 'node-uuid';
import _ from 'lodash';
import $ from 'jquery';

import MeasureTable from './MeasureTable';
import MeasureButtonBar from './MeasureButtonBar';

import cmplx_data from '../../resources/CMPLX.json';
import ufp_data from '../../resources/UFP.json';

class Measure extends Component {

  constructor(){
    super();
    this.state = {
      fp_lines: [],
      measure_title: '',
      measure_id: undefined,
      total_fps: 0
    }
  }

  componentWillMount() {
    this.setState({measure_id: this.props.measure_id});
  }

  componentDidMount() {
    this.getMeasureDatas(this.state.measure_id);
  }

  getMeasureDatas(measure_id){
    var _that = this;
    var data = {
      id: measure_id
    };

    $.ajax({
      type: 'GET',
      url: '/api/measure',
      data: data,
      beforeSend: function(xhr){xhr.setRequestHeader("x-access-token", _that.props.jwt_token);},
    })
    .done(function(res_data) {
        var d = _.first(res_data.data);
        _that.setState({measure_title: d.name, fp_lines: d.fp_lines });    
        _that.getTotalFPS();  
    })
    .fail(function(jqXhr) {
      console.log('failed to call server');
    });
  }

  saveMeasure() {
    var _that = this;

    var data = {
      user_id: this.props.user._id,
      measure_id: this.state.measure_id,
      fp_lines: this.state.fp_lines,
      measure_title: this.state.measure_title,
      total_fps: this.state.total_fps
    }

    $.ajax({
      type: 'POST',
      url: '/api/measure',
      data: data,
      beforeSend: function(xhr){xhr.setRequestHeader("x-access-token", _that.props.jwt_token);},
    })
    .done(function(data) {
      if(data.success) {
        //TODO da gestire un messaggio
      }
    })
    .fail(function(jqXhr) {
      console.log('failed to call server');
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

  handleChangedTitle(event) {
    this.setState({measure_title: event.target.value});
  }

  handleCloseMeasure() {
    this.props.handleCloseMeasure();
  }  
	
  render() {
    return (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="panel-title pull-left seventy_percent">
                  <strong className="title">Measure name: </strong><input type="text" className="fifty_percent" value={this.state.measure_title} placeholder="Please enter a name." onChange={this.handleChangedTitle.bind(this)}/>
                </div>
                <div className="panel-title pull-right">
                  <button type="button" className="btn btn-info button_spacing" aria-label="Config" title="Configuration"><span className="fa fa-cog" aria-hidden="true"></span></button>
                  <button type="button" className="btn btn-success button_spacing" aria-label="Save" title="Save measure" onClick={this.saveMeasure.bind(this)}><span className="fa fa-floppy-o" aria-hidden="true"></span></button>
                  <button type="button" className="btn btn-danger" aria-label="Close" title="Close measure" onClick={this.handleCloseMeasure.bind(this)}><span className="fa fa-times-circle-o" aria-hidden="true"></span></button>
                </div>
                <div className="clearfix"></div>            
              </div>
              <div className="panel-body">
                <p className="text-center ufp">Total UFP: {this.state.total_fps}</p>
              </div>
              <MeasureTable lines={this.state.fp_lines} onDelLine={this.handleDeleteLine.bind(this)} onChangeLine={this.handleChangeLine.bind(this)}/>
            </div>
            <MeasureButtonBar onEmptyAdd={this.handleAddEmptyLine.bind(this)}/>
          </div>
    );
  }
}

export default Measure;