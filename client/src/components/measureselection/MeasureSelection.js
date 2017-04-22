import React, { Component } from 'react';

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import $ from 'jquery';

import MeasureSelectionTable from './MeasureSelectionTable';
import MeasureSelectionButtonBar from './MeasureSelectionButtonBar';

class MeasureSelection extends Component {

  constructor(){
    super();
      this.state = {
	      lines: [],
      }
  }

  componentDidMount() {
    this.getLines();
  }

  getLines(){
    var _that = this;

    var data = {
      user_id: this.props.user._id
    }

    $.ajax({
      type: 'GET',
      url: '/api/measure_list',
      data: data,
      beforeSend: function(xhr){xhr.setRequestHeader("x-access-token", _that.props.jwt_token);},
    })
    .done(function(data) {
        _that.setState({lines: data.measures });    
    })
    .fail(function(jqXhr) {
      console.log('failed to call server');
    });
  }

  handleDeleteMeasure(id){

    var _that = this;

    var data = {
      measure_id: id,
    }

    $.ajax({
      type: 'DELETE',
      url: '/api/measure',
      data: data,
      beforeSend: function(xhr){xhr.setRequestHeader("x-access-token", _that.props.jwt_token);},
    })
    .done(function(data) {
      if (data.success) {

        let lines = _that.state.lines;
        let index = lines.findIndex(x => x._id === id);

        lines.splice(index, 1);
        _that.setState({lines:lines});

        NotificationManager.success('Measure correctly deleted.', 'Measure deleted');
      } else {
        NotificationManager.error(data.message, 'Measure not saved');
      }
    })
    .fail(function(jqXhr) {
      NotificationManager.error('An error occured while deleting the measure.', 'Measure not deleted');
    });
  }

  handleLoadMeasure(id) {
    this.props.handleLoadMeasure(id);
  }

  handleNewMeasure() {
    this.props.handleNewMeasure();
  }

  render() {
    return (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="panel-title">
                  <strong className="title">Please select a measure:</strong>
                </div>          
              </div>
              <MeasureSelectionTable lines={this.state.lines} onDelLine={this.handleDeleteMeasure.bind(this)} onLoadMeasure={this.handleLoadMeasure.bind(this)}/>
            </div>
            <MeasureSelectionButtonBar onNewMeasure={this.handleNewMeasure.bind(this)}/>
            <NotificationContainer/>
          </div>
    );
  }
}

export default MeasureSelection;