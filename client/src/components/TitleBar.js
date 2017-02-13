import React, { Component } from 'react';

class TitleBar extends Component {
  render() {
    return (
		<p>
			<h4>Measure: <input type="text" name="measure_title" value={this.props.measure_title} placeholder="Please enter a name for this measure."></input></h4>
		</p>
    );
  }
}

export default TitleBar;