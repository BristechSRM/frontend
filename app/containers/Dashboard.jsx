import React, { Component } from 'react';
import { connect } from 'react-redux'

import SpeakerList from '../components/SpeakerList.jsx';
import SpeakerFilter from '../components/SpeakerFilter.jsx';
import { requestSpeakers, speakerFilterChanged } from '../actions';
import styles from './dashboard.scss';
import { Map } from 'immutable';

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(requestSpeakers());
  }

  handleFilterChange(e) {
    this.props.dispatch(speakerFilterChanged(e));
  }

  render() {
    return (
        <div className={styles.sessions}>
          <div className={styles.sessionList}>
            <SpeakerList speakers={this.props.speakers} />
          </div>
          <div className={styles.sessionFilter}>
            <SpeakerFilter options={this.props.speakerFilters} onChange={this.handleFilterChange.bind(this)} />
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    speakers: state.get('sessions').get('speakers'),
    speakerFilters: state.get('sessions').get('speakerFilters')
  }
}

export default connect(mapStateToProps)(Dashboard)
