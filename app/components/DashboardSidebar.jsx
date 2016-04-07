import React, { Component, PropTypes } from 'react';
import SessionFilter from './SessionFilter.jsx';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Checkbox from 'material-ui/lib/checkbox';
import immutable from 'immutable';

import styles from './dashboardSidebar.scss';

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
            <div className={styles.dashboardSidebar}>
                <div className={styles.section}>
                    <h1>Apply Filter</h1>
                    <SessionFilter options={this.props.filters} onChange={(filters) => this.handleFilterChange(filters)} />
                </div>
                <div className={styles.section}>
                    <h1>Sort By</h1>
                    <DropDownMenu className={styles.dropdown} value={this.props.sortProperty} onChange={(e, i, v) => this.handleSortPropertyChange(e, i, v)}>
                       <MenuItem value={"last-contacted"} primaryText="Last Contacted"/>
                       <MenuItem value={"name"} primaryText="Name"/>
                       <MenuItem value={"rating"} primaryText="Rating"/>
                    </DropDownMenu>

                    <Checkbox
                        className={styles.isAscCheckbox}
                        label='Ascending Order'
                        checked={this.props.isSortOrderAscending}
                        onCheck={(e, c) => this.handleSortOrderChange(e, c)} />
                </div>
            </div>
        );
    }
}

DashboardSidebar.propTypes = {
    onSessionViewSettingsChange: PropTypes.func,
    isSortOrderAscending: PropTypes.bool,
    sortProperty: PropTypes.string,
    filters: PropTypes.instanceOf(immutable.Map)
};

export default DashboardSidebar;
