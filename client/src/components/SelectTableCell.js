import React, { Component } from 'react';

class SelectTableCell extends Component {

  constructor(){
    super();
      this.state = {
	      line_data: {}
      }
  }

  componentDidMount(){
	  this.setState({line_data: this.props.line});
  } 

  onChange(event){
	var curr_data = this.state.line_data;

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
		
	this.setState({value: event.target.value, line_data: curr_data}, function() {
		if (this.props.onChange !== undefined) {
			this.props.onChange(this.props._id, this.state.line_data);
		}
	});
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
      <td>
        <select name={this.props.name} defaultValue={this.props.value} onChange={this.onChange.bind(this)}>{options}</select>
      </td>
    );
  }
}

export default SelectTableCell;