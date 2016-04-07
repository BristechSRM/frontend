import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import SessionList from '../components/SessionList.jsx';
import DashboardSidebar from '../components/dashboardSidebar.jsx';
import { getSessions } from '../actions';
import styles from './dashboard.scss';
import immutable from 'immutable';

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getSessions(
            this.props.filters,
            this.props.sortProperty,
            this.props.isSortOrderAscending,
            true));
    }

    handleSessionViewSettingsChange(viewSettings) {
        this.props.dispatch(getSessions(
            viewSettings.get('filters'),
            viewSettings.get('sortProperty'),
            viewSettings.get('isSortOrderAscending')));
    }

    render() {
        return (
            <div className={styles.sessions}>
              <div className={styles.sessionList}>
                {this.props.isFetching ? "Loading..." :
                <SessionList sessions={this.props.sessions} />}
              </div>
              <div className={styles.dashboardSidebar}>
                <DashboardSidebar filters={this.props.filters} sortProperty={this.props.sortProperty} isSortOrderAscending={this.props.isSortOrderAscending} onSessionViewSettingsChange={e => this.handleSessionViewSettingsChange(e)} />
              </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.get('sessions').get('isFetching'),
        sessions: state.get('sessions').get('sessions'),
        filters: state.get('sessions').get('viewSettings').get('filters'),
        sortProperty: state.get('sessions').get('viewSettings').get('sortProperty'),
        isSortOrderAscending: state.get('sessions').get('viewSettings').get('isSortOrderAscending')
    }
}

Dashboard.propTypes = {
    isSortOrderAscending: PropTypes.bool,
    sortProperty: PropTypes.string,
    filters: PropTypes.instanceOf(immutable.Map),
    sessions: PropTypes.instanceOf(immutable.List),
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func
};

export default connect(mapStateToProps)(Dashboard)
