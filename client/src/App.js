import React, { Component } from 'react';
import $ from 'jquery';

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import Navbar from './components/navbar/Navbar';
import LoginRegister from './components/loginregister/LoginRegister';
import MeasureSelection from './components/measureselection/MeasureSelection';
import Measure from './components/measure/Measure';

const initialState = {
  isLoggedIn:  false || localStorage.getItem('isLoggedIn'),
  loadedMeasure: false || localStorage.getItem('loadedMeasure'),
  jwt_token: undefined || localStorage.getItem('jwt_token'),
  loggedUserName: undefined || localStorage.getItem('loggedUserName'),
  loggedUserId: undefined || localStorage.getItem('loggedUserId'),
  loaded_measure_id: undefined || localStorage.getItem('loaded_measure_id')
}

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  componentDidMount() {
    //handle windows closing
    window.addEventListener('beforeunload', this.logout);
  }

  componentWillUnmount() {
    //handle windows closing
    window.removeEventListener('beforeunload', this.logout);
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
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("jwt_token", data.token);
        localStorage.setItem("loggedUserName", data.user.name);
        localStorage.setItem("loggedUserId", data.user._id);        
      }
    })
    .fail(function(jqXhr) {
      NotificationManager.error(JSON.parse(jqXhr.responseText).message, 'Login error');
    });
  }

  logout() {
    localStorage.clear();
    this.setState(initialState);
  }

  handleLoadMeasure(id) {
    this.setState({loadedMeasure: true, loaded_measure_id: id});
    localStorage.setItem("loadedMeasure", true);
    localStorage.setItem("loaded_measure_id", id);
  }

  handleCloseMeasure() {
    this.setState({loadedMeasure: false, loaded_measure_id: undefined});
    localStorage.setItem("loadedMeasure", false);
    localStorage.setItem("loaded_measure_id", undefined);
  }

  handleNewMeasure() {
    this.setState({loadedMeasure: true});
    localStorage.setItem("loadedMeasure", true);
    localStorage.setItem("loaded_measure_id", undefined);
  }

  render() {
    return (
      <div className="App">
        <Navbar loggedIn={this.state.isLoggedIn} name={this.state.loggedUserName} onLogout={this.logout.bind(this)}/>
        {this.state.isLoggedIn && this.state.loadedMeasure &&
          <Measure jwt_token={this.state.jwt_token} userid={this.state.loggedUserId} measure_id={this.state.loaded_measure_id} handleCloseMeasure={this.handleCloseMeasure.bind(this)}/>
        }
        {this.state.isLoggedIn && !this.state.loadedMeasure &&
          <MeasureSelection jwt_token={this.state.jwt_token} userid={this.state.loggedUserId} handleLoadMeasure={this.handleLoadMeasure.bind(this)} handleNewMeasure={this.handleNewMeasure.bind(this)}/>
        }        
        {!this.state.isLoggedIn &&
          <LoginRegister onLogin={this.login.bind(this)}/>
        }
        <NotificationContainer/>
      </div>
    );
  }
}

export default App;