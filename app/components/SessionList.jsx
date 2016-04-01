import React, { Component } from 'react';
import { connect } from 'react-redux'
import Session from './Session.jsx';
import _ from 'lodash';
import styles from './sessionList.scss';

class SessionList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.sessionList}>
        {this.props.sessions.valueSeq().map(session =>
          <Session
              key={session.id}
              width={250}
              height={250}
              name={session.name}
              title={session.title}
              rating={session.rating}
              adminImageUri={session.adminImageUrl} />
        )}
      </div>
    )
  }
}

export default SessionList;
