import React, { Component } from 'react';

class LoginRegister extends Component {

  constructor(){
    super();
      this.state = {
	      username: '',
          password: ''
      }
  }

  changeUsername(event) {
    this.setState({username: event.target.value});
  }

  changePassword(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="main_welcome_title">Welcome to IFPUG App!</h1>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-xs-6">
                                    <div className="well">
                                        <form id="loginForm" method="POST">
                                            <div className="form-group">
                                                <label htmlFor="username">Username:</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <span className="fa fa-user"></span>
                                                    </span>
                                                    <input type="text" name="username" className="form-control" placeholder="Username" onChange={this.changeUsername.bind(this)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="username">Password:</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <span className="fa fa-key"></span>
                                                    </span>
                                                    <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.changePassword.bind(this)} />
                                                </div>
                                            </div>
                                            <button type="button" value="login" name="submit" className="btn btn-success btn-block" onClick={this.props.onLogin.bind(this, this.state.username, this.state.password)}>Login</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-xs-6">
                                    <p className="lead">Register now for <span className="text-success">FREE</span></p>
                                    <ul className="list-unstyled">
                                        <li><span className="fa fa-check text-success"></span> Manage unlimited IFPUG measures</li>
                                        <li><span className="fa fa-check text-success"></span> Export measures in XLS/CSV formats</li>
                                        <li><span className="fa fa-check text-success"></span> Configure parameters for Operation Types</li>
                                        <li><span className="fa fa-check text-success"></span> Share measures with other IFPUG App users</li>
                                    </ul>
                                    <button type="button" value="signup" name="signup" className="btn btn-info btn-block">Register Now!</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
  }
}

export default LoginRegister;