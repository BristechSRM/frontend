import React, { Component } from 'react';
import SessionFilter from './SessionFilter.jsx';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Checkbox from 'material-ui/lib/checkbox';
import immutable from 'immutable';

class DashboardSidebar extends Component {

  handleFilterChange(filters) {
    this.props.onSessionViewSettingsChange(immutable.Map({
      filters: filters,
      sortProperty: this.props.sortProperty,
      isSortOrderAscending: this.props.isSortOrderAscending
    }));
  }

  handleSortPropertyChange(event, index, value) {
    this.props.onSessionViewSettingsChange(immutable.Map({
      filters: this.props.filters,
      sortProperty: value,
      isSortOrderAscending: this.props.isSortOrderAscending
    }));
  }

  handleSortOrderChange(event, value) {
    this.props.onSessionViewSettingsChange(immutable.Map({
      filters: this.props.filters,
      sortProperty: this.props.sortProperty,
      isSortOrderAscending: value
    }));
  }

  render() {
    return (
            <div>
                <SessionFilter options={this.props.filters} onChange={(filters) => this.handleFilterChange(filters)} />

                <DropDownMenu value={this.props.sortProperty} onChange={(e, i, v) => this.handleSortPropertyChange(e, i, v)}>
                   <MenuItem value={"last-contacted"} primaryText="Last Contacted"/>
                   <MenuItem value={"name"} primaryText="Name"/>
                   <MenuItem value={"rating"} primaryText="Rating"/>
                </DropDownMenu>

                <Checkbox
                    label='Ascending Order'
                    checked={this.props.isSortOrderAscending}
                    onCheck={(e, c) => this.handleSortOrderChange(e, c)} />
            </div>
        );
  }
}

export default DashboardSidebar;
