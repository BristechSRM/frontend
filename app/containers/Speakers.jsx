import React, { Component } from 'react';
import { connect } from 'react-redux'

import SpeakerList from '../components/SpeakerList.jsx';
import SpeakerFilter from '../components/SpeakerFilter.jsx';
import { requestSpeakers, speakerFilterChanged } from '../actions';
import styles from './speakers.scss';
import { Map } from 'immutable';

class Speakers extends Component {

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
        <div className={styles.speakers}>
          <div className={styles.speakerList}>
            <SpeakerList speakers={this.props.speakers} />
          </div>
          <div className={styles.speakerFilter}>
            <SpeakerFilter options={this.props.speakerFilters} onChange={this.handleFilterChange.bind(this)} />
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    speakers: state.get('speakers'),
    speakerFilters: state.get('speakerFilters')
  }
}

export default connect(mapStateToProps)(Speakers)
