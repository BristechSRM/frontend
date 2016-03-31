import React, { Component } from 'react';
import { connect } from 'react-redux'
import Speaker from './Speaker.jsx';
import _ from 'lodash';
import styles from './speakerList.scss';

class SpeakerList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.speakerList}>
        {this.props.speakers.valueSeq().map(speaker =>
          <Speaker
              key={speaker.id}
              width={250}
              height={250}
              name={speaker.name}
              title={speaker.title}
              rating={speaker.rating}
              adminImageUri={speaker.adminImageUrl} />
        )}
      </div>
    )
  }
}

export default SpeakerList;
