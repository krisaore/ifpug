import React, { Component } from 'react';

import _ from 'lodash';

class MeasureSelectTableCell extends Component {

  constructor(){
    super();
      this.state = {
	      line_data: {}
      }
  }

	componentWillReceiveProps(nextProps) {
		this.setState({value: nextProps.value});
	}  

  componentDidMount(){
	  this.setState({line_data: this.props.line});
  } 

  onChange(event){
    var curr_data = _.cloneDeep(this.state.line_data);

    switch (event.target.name) {
        case 'type':
          curr_data['type'] = event.target.value;
        break;

        case 'operation':
          curr_data['operation'] = event.target.value;
        break;

        default:
        break;
    }

    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props._id, curr_data);
    }
    this.setState({value: event.target.value, line_data: curr_data});  

  }

  render() {
    let options;
    if(this.props.options){
      options = this.props.options.map(option => {
        return (
          <option key={option.id} value={option.value}>{option.value}</option>
        );
      });
    }
    return (
        <select name={this.props.name} value={this.props.value} onChange={this.onChange.bind(this)} disabled={this.props.status}>{options}</select>
    );
  }
}

export default MeasureSelectTableCell;