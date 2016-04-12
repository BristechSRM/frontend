import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import SessionCard from './SessionCard.jsx';
import immutable from 'immutable';
import styles from './sessionList.scss';

class SessionList extends Component {

    render() {
        return (
            <div className={styles.sessionList}>
                {this.props.sessions.valueSeq().map(session =>
                    <div key={session.id} className={styles.sessionCard}>
                        <Link to={`sessions/${session.id}`}>
                            <SessionCard
                              key={session.id}
                              speakerName={session.speakerName}
                              title={session.title}
                              status={session.status}
                              rating={session.speakerRating}
                              adminName={session.adminName}
                              adminImageUri={session.adminImageUrl}
                              speakerLastContact={session.speakerLastContact}
                            />
                        </Link>
                    </div>
                )}
            </div>
        );
    }
}

SessionList.propTypes = {
    sessions: PropTypes.instanceOf(immutable.List),
};

export default SessionList;
