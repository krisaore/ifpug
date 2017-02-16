import React, { Component } from 'react';

class TitleBar extends Component {
  render() {
    return (
		<h4>Measure: <input type="text" defaultValue={this.props.measure_title} placeholder="Please enter a name." /></h4>
    );
  }
}

export default TitleBar;