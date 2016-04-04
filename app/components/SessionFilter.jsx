import React, { Component, PropTypes } from 'react';
import immutable from 'immutable';
import Checkbox from 'material-ui/lib/checkbox';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

class SessionFilter extends Component {

  constructor(props) {
    super(props);
  }

  handleCheck(status, checked) {
    var newFilter = this.props.options.set(status, checked);
    this.props.onChange(newFilter);
  }

  handleChange() {
    console.log('hello');
  }

  render() {
    return (
      <div>
        <Checkbox
            key={1}
            label='Assigned'
            checked={this.props.options.get('1') || false}
            onCheck={(e, c) => this.handleCheck('1', c)} />
        <Checkbox
            key={2}
            label='In Progress'
            checked={this.props.options.get('2') || false}
            onCheck={(e, c) => this.handleCheck('2', c)} />
        <Checkbox
            key={3}
            label='Deferred'
            checked={this.props.options.get('3') || false}
            onCheck={(e, c) => this.handleCheck('3', c)} />
        <Checkbox
            key={4}
            label='Topic Approved'
            checked={this.props.options.get('4') || false}
            onCheck={(e, c) => this.handleCheck('4', c)} />
        <Checkbox
            key={5}
            label='Date Assigned'
            checked={this.props.options.get('5') || false}
            onCheck={(e, c) => this.handleCheck('5', c)} />
        <DropDownMenu value={3} onChange={this.handleChange}>
           <MenuItem value={1} primaryText="Never"/>
           <MenuItem value={2} primaryText="Every Night"/>
           <MenuItem value={3} primaryText="Weeknights"/>
           <MenuItem value={4} primaryText="Weekends"/>
           <MenuItem value={5} primaryText="Weekly"/>
        </DropDownMenu>
      </div>
    )
  }
}

export default SessionFilter;
