import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SessionsService from '../services/SessionsService';

import SessionList from '../components/Dashboard/SessionList/SessionList.jsx';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar/DashboardSidebar.jsx';
import { getAllSessions, changeViewSettings } from '../actions';
import styles from './dashboard.scss';

class Dashboard extends Component {

    componentDidMount() {
        this.props.dispatch(getAllSessions());
    }

    handleSessionViewSettingsChange(viewSettings) {
        this.props.dispatch(changeViewSettings(viewSettings));
    }

    handleSessionSelected(session) {
    }

    render() {
        const output = this.props.error
            ? <p>There was an error retrieving sessions - '{this.props.error.message}'</p>
          : <SessionList sessions={this.props.sessions} onSessionSelected={s => this.handleSessionSelected(s)} />;

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
    filters: PropTypes.object,
    sessions: PropTypes.array,
    isFetching: PropTypes.bool,
    error: PropTypes.shape({ message: PropTypes.string }),
    dispatch: PropTypes.func,
};

const getViewSettings = (state) => state.sessions.viewSettings;
const getSessions = (state) => state.sessions.sessions;

const getFilteredAndSortedSessions = createSelector(
  [getSessions, getViewSettings],
  (sessions, viewSettings) =>
      SessionsService.filterAndSort(
        sessions,
        viewSettings.filters,
        viewSettings.sortProperty,
        viewSettings.isSortOrderAscending)
);

function mapStateToProps(state) {
    return {
        isFetching: state.sessions.isFetching,
        error: state.sessions.error,
        sessions: getFilteredAndSortedSessions(state),
        filters: state.sessions.viewSettings.filters,
        sortProperty: state.sessions.viewSettings.sortProperty,
        isSortOrderAscending: state.sessions.viewSettings.isSortOrderAscending,
    };
}

export default connect(mapStateToProps)(Dashboard);
