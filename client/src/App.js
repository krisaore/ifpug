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
      loggedUser: {}, //|| localStorage.getItem('loggedUser')
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
        _that.setState({isLoggedIn: true, jwt_token: data.token, loggedUser: data.user });
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
  
  render() {
    return (
      <div className="App">
        <Navbar loggedIn={this.state.isLoggedIn} name={this.state.loggedUser.name}/>
        {this.state.isLoggedIn && this.state.loadedMeasure &&
          <Measure jwt_token={this.state.jwt_token} measure_id={this.state.measure_id} handleCloseMeasure={this.handleCloseMeasure.bind(this)}/>
        }
        {this.state.isLoggedIn && !this.state.loadedMeasure &&
          <MeasureSelection jwt_token={this.state.jwt_token} user={this.state.loggedUser} handleLoadMeasure={this.handleLoadMeasure.bind(this)}/>
        }        
        {!this.state.isLoggedIn &&
          <LoginRegister onLogin={this.login.bind(this)}/>
        }
      </div>
    );
  }
}

export default App;