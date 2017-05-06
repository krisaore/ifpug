import React, { Component } from 'react';

import _ from 'lodash';

class MeasureLineTitleField extends Component {

  constructor(){
    super();
    this.state = {
      value: '',
	    line_data: {}
    }
  }

	componentWillReceiveProps(nextProps) {
		this.setState({value: nextProps.value});
	}  

  componentDidMount(){
    this.setState({value: this.props.value || ''});
	  this.setState({line_data: this.props.line});
  }  

  onChange(event) {
		  var curr_data = _.cloneDeep(this.state.line_data);
      curr_data['function_name'] = event.target.value;
		
      if (this.props.onChange !== undefined) {
				this.props.onChange(this.props._id, curr_data);
			}

	    this.setState({value: event.target.value, line_data: curr_data});
  }

  render() {
    return (
        <input type="text" name={this.props.name} className={this.props.className} value={this.state.value} onChange={this.onChange.bind(this)} disabled={this.props.status}/>
    );
  }
}

export default MeasureLineTitleField;