import React, { Component } from 'react';

class SelectTableCell extends Component {

  onChangeLine(id){
    this.props.onChangeLine(id);
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
        <select defaultValue={this.props.value} onChange={this.onChangeLine.bind(this, this.props._id)}>{options}</select>
      </td>
    );
  }
}

export default SelectTableCell;