import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SessionsService from '../services/SessionsService';

import SessionList from '../components/Dashboard/SessionList/SessionList.jsx';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar/DashboardSidebar.jsx';
import { getAllSessions, changeViewSettings } from '../actions';
import styles from './dashboard.scss';
import immutable from 'immutable';

class Dashboard extends Component {

    componentDidMount() {
        this.props.dispatch(getAllSessions());
    }

    handleSessionViewSettingsChange(viewSettings) {
        this.props.dispatch(changeViewSettings(viewSettings));
    }

    render() {
        const output = this.props.error
            ? <p>There was an error retrieving sessions - '{this.props.error.message}'</p>
            : <SessionList sessions={this.props.sessions} />;

        const list = this.props.isFetching ? 'Loading...' : output;

        return (
            <div className={styles.sessions}>
                <div className={styles.sessionList}>
                    {list}
                </div>
                <div className={styles.dashboardSidebar}>
                    <DashboardSidebar
                      filters={this.props.filters}
                      sortProperty={this.props.sortProperty}
                      isSortOrderAscending={this.props.isSortOrderAscending}
                      onSessionViewSettingsChange={e => this.handleSessionViewSettingsChange(e)}
                    />
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    isSortOrderAscending: PropTypes.bool,
    sortProperty: PropTypes.string,
    filters: PropTypes.instanceOf(immutable.Map),
    sessions: PropTypes.instanceOf(immutable.List),
    isFetching: PropTypes.bool,
    error: PropTypes.shape({ message: PropTypes.string }),
    dispatch: PropTypes.func,
};

const getViewSettings = (state) => state.get('sessions').get('viewSettings');
const getSessions = (state) => state.get('sessions').get('sessions');

const getFilteredAndSortedSessions = createSelector(
  [getSessions, getViewSettings],
  (sessions, viewSettings) =>
      SessionsService.filterAndSort(
        sessions,
        viewSettings.get('filters'),
        viewSettings.get('sortProperty'),
        viewSettings.get('isSortOrderAscending'))
);

function mapStateToProps(state) {
    return {
        isFetching: state.get('sessions').get('isFetching'),
        error: state.get('sessions').get('error'),
        sessions: getFilteredAndSortedSessions(state),
        filters: state.get('sessions').get('viewSettings').get('filters'),
        sortProperty: state.get('sessions').get('viewSettings').get('sortProperty'),
        isSortOrderAscending: state.get('sessions').get('viewSettings').get('isSortOrderAscending'),
    };
}

export default connect(mapStateToProps)(Dashboard);
