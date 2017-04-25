import React, { Component } from 'react';
import $ from 'jquery';

import Navbar from './components/navbar/Navbar';
import LoginRegister from './components/loginregister/LoginRegister';
import MeasureSelection from './components/measureselection/MeasureSelection';
import Measure from './components/measure/Measure';

class App extends Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn:  false, // || localStorage.getItem('isLoggedIn'),
      loadedMeasure: false,
      jwt_token: undefined,//|| localStorage.getItem('jwt_token'),
      loggedUserName: undefined, //|| localStorage.getItem('loggedUser')
      loggedUserId: undefined,
      measure_id: undefined
    }
  }

  login(username, password) {
    var _that = this;

    var data = {
      username: username,
      password: password,
    }

    $.ajax({
      type: 'POST',
      url: '/api/authenticate',
      data: data
    })
    .done(function(data) {
      if(data.success) {
        _that.setState({isLoggedIn: true, jwt_token: data.token, loggedUserName: data.user.name, loggedUserId: data.user._id });
        //localStorage.setItem("isLoggedIn", true);
        //localStorage.setItem("jwt_token", data.token);
        //localStorage.setItem("loggedUser", data.user);
      }
    })
    .fail(function(jqXhr) {
      console.log('failed to call server');
    });
  }

  handleLoadMeasure(id) {
    this.setState({loadedMeasure: true, measure_id: id});
  }

  handleCloseMeasure() {
    this.setState({loadedMeasure: false, measure_id: undefined});
  }

  handleNewMeasure() {
    this.setState({loadedMeasure: true});
  }

  render() {
    return (
      <div className="App">
        <Navbar loggedIn={this.state.isLoggedIn} name={this.state.loggedUserName}/>
        {this.state.isLoggedIn && this.state.loadedMeasure &&
          <Measure jwt_token={this.state.jwt_token} userid={this.state.loggedUserId} measure_id={this.state.measure_id} handleCloseMeasure={this.handleCloseMeasure.bind(this)}/>
        }
        {this.state.isLoggedIn && !this.state.loadedMeasure &&
          <MeasureSelection jwt_token={this.state.jwt_token} userid={this.state.loggedUserId} handleLoadMeasure={this.handleLoadMeasure.bind(this)} handleNewMeasure={this.handleNewMeasure.bind(this)}/>
        }        
        {!this.state.isLoggedIn &&
          <LoginRegister onLogin={this.login.bind(this)}/>
        }
      </div>
    );
  }
}

export default App;