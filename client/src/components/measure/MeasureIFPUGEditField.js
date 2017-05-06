import React, { Component } from 'react';

class MeasureIFPUGEditField extends Component {

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
		var curr_data = this.state.line_data;
		switch (event.target.name) {
				case 'det':
					curr_data['det'] = event.target.value;
				break;

				case 'ret_ftr':
					curr_data['ret_ftr'] = event.target.value;
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
    return (
        <input type="text" name={this.props.name} className={this.props.className} value={this.state.value} onChange={this.onChange.bind(this)} disabled={this.props.status}/>
    );
  }
}

export default MeasureIFPUGEditField;