import React, { Component } from 'react';

class TitleBar extends Component {
  render() {
    return (
		<p>
			<h4>Measure: <input type="text" onChange={function() {}} value={this.props.measure_title} placeholder="Please enter a name." /></h4>
		</p>
    );
  }
}

export default TitleBar;