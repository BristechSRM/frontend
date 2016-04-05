import React, { Component } from 'react';
import { connect } from 'react-redux'

import SessionList from '../components/SessionList.jsx';
import DashboardSidebar from '../components/dashboardSidebar.jsx';
import { requestSessions, sessionViewSettingsChanged } from '../actions';
import styles from './dashboard.scss';
import immutable from 'immutable';
import CircularProgress from 'material-ui/lib/circular-progress';

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(requestSessions(
      this.props.filters,
      this.props.sortProperty,
      this.props.isSortOrderAscending));
  }

  handleSessionViewSettingsChange(viewSettings) {
     this.props.dispatch(requestSessions(
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
  console.log(state);
  return {
    isFetching: state.get('sessions').get('isFetching'),
    sessions: state.get('sessions').get('sessions'),
    filters: state.get('sessions').get('viewSettings').get('filters'),
    sortProperty: state.get('sessions').get('viewSettings').get('sortProperty'),
    isSortOrderAscending: state.get('sessions').get('viewSettings').get('isSortOrderAscending')
  }
}

export default connect(mapStateToProps)(Dashboard)
