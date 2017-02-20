import React, { Component } from 'react';

class EditField extends Component {

  constructor(){
    super();
    this.state = {
      value: '',
      //onBlur: this.onBlur.bind(this)
    }
  }

  componentDidMount(){
    this.setState({value: this.props.value || ''});
  }  

  onBlur(event) {
    this.setState({value: event.target.value});
    if (this.props.onBlur !== undefined) {
        this.props.onBlur.bind(this, this.props._id);
    }
  }

  render() {
    return (
        <input type="text" className={this.props.className} defaultValue={this.state.value} onBlur={this.onBlur.bind(this)}/>
    );
  }
}

export default EditField;