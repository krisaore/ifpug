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
      loadedMeasure: true,
      jwt_token: undefined,//|| localStorage.getItem('jwt_token'),
      loggedUser: {}, //|| localStorage.getItem('loggedUser')
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

        //_that.getDatas();
      }
    })
    .fail(function(jqXhr) {
      console.log('failed to call server');
    });
  }
  
  render() {
    return (
      <div className="App">
        <Navbar loggedIn={this.state.isLoggedIn} name={this.state.loggedUser.name}/>
        {this.state.isLoggedIn && this.state.loadedMeasure &&
          <Measure jwt_token={this.state.jwt_token} />
        }
        {this.state.isLoggedIn && !this.state.loadedMeasure &&
          <MeasureSelection />
        }        
        {!this.state.isLoggedIn &&
          <LoginRegister onLogin={this.login.bind(this)}/>
        }     
      </div>      
    );
  }
}

export default App;