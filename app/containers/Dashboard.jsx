import React, { Component } from 'react';
import { connect } from 'react-redux'

import SessionList from '../components/SessionList.jsx';
import DashboardSidebar from '../components/dashboardSidebar.jsx';
import { requestSessions, sessionViewSettingsChanged } from '../actions';
import styles from './dashboard.scss';
import { Map } from 'immutable';

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(requestSessions());
  }

  handleSessionViewSettingsChange(e) {
     this.props.dispatch(sessionViewSettingsChanged(e));
  }

  render() {
    return (
        <div className={styles.sessions}>
          <div className={styles.sessionList}>
            <SessionList sessions={this.props.sessions} />
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
    sessions: state.get('sessions').get('sessions'),
    filters: state.get('sessions').get('viewSettings').get('filters'),
    sortProperty: state.get('sessions').get('viewSettings').get('sortProperty'),
    isSortOrderAscending: state.get('sessions').get('viewSettings').get('isSortOrderAscending')
  }
}

export default connect(mapStateToProps)(Dashboard)
