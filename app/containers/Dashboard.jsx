import React, { Component } from 'react';
import { connect } from 'react-redux'

import SessionList from '../components/SessionList.jsx';
import DashboardSidebar from '../components/dashboardSidebar.jsx';
import { requestSessions, sessionFilterChanged } from '../actions';
import styles from './dashboard.scss';
import { Map } from 'immutable';

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(requestSessions());
  }

  handleFilterChange(e) {
    this.props.dispatch(sessionFilterChanged(e));
  }

  handleOrderChange(e) {
    console.log("Hi!");
  }

  render() {
    return (
        <div className={styles.sessions}>
          <div className={styles.sessionList}>
            <SessionList sessions={this.props.sessions} />
          </div>
          <div className={styles.dashboardSidebar}>
            <DashboardSidebar sessionFilters={this.props.sessionFilters} onFilterChange={this.handleFilterChange.bind(this)} onOrderChange={this.handleOrderChange.bind(this)} />
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sessions: state.get('sessions').get('sessions'),
    sessionFilters: state.get('sessions').get('sessionFilters')
  }
}

export default connect(mapStateToProps)(Dashboard)
