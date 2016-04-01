import React, { Component } from 'react';
import { connect } from 'react-redux'

import SessionList from '../components/SessionList.jsx';
import SessionFilter from '../components/SessionFilter.jsx';
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

  render() {
    return (
        <div className={styles.sessions}>
          <div className={styles.sessionList}>
            <SessionList sessions={this.props.sessions} />
          </div>
          <div className={styles.sessionFilter}>
            <SessionFilter options={this.props.sessionFilters} onChange={this.handleFilterChange.bind(this)} />
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
