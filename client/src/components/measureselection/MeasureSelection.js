import React, { Component } from 'react';
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
      url: '/api/list',
      data: data,
      beforeSend: function(xhr){xhr.setRequestHeader("x-access-token", _that.props.jwt_token);},
    })
    .done(function(data) {
        console.log(data.measures);
        _that.setState({lines: data.measures });    
    })
    .fail(function(jqXhr) {
      console.log('failed to call server');
    });
  }

  render() {
    return (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="panel-title">
                  <strong className="title">Please select a measure to load:</strong>
                </div>          
              </div>
              <MeasureSelectionTable lines={this.state.lines}/>
            </div>
            <MeasureSelectionButtonBar/>
          </div>
    );
  }
}

export default MeasureSelection;