import React, { Component } from 'react';

class MeasureLineTitleField extends Component {

  constructor(){
    super();
    this.state = {
        value: '',
	    line_data: {}
    }
  }

  componentDidMount(){
    this.setState({value: this.props.value || ''});
	this.setState({line_data: this.props.line});
  }  

  onChange(event) {
		var curr_data = this.state.line_data;
        curr_data['function_name'] = event.target.value
		
	    this.setState({value: event.target.value, line_data: curr_data}, function() {
			if (this.props.onChange !== undefined) {
				this.props.onChange(this.props._id, this.state.line_data);
			}
		});
  }

  render() {
    return (
        <input type="text" name={this.props.name} className={this.props.className} value={this.state.value} onChange={this.onChange.bind(this)}/>
    );
  }
}

export default MeasureLineTitleField;