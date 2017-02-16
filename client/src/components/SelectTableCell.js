import React, { Component } from 'react';

class SelectTableCell extends Component {
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
        <select defaultValue={this.props.value}>{options}</select>
      </td>
    );
  }
}

export default SelectTableCell;