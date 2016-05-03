import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import SessionCard from './SessionCard.jsx';
import styles from './sessionList.scss';

class SessionList extends Component {

    render() {
        return (
            <div className={styles.sessionList}>
                {this.props.sessions.map(session =>
                    <div key={session.id} className={styles.sessionCard}>
                        <Link to={`sessions/${session.id}`}>
                            <SessionCard
                              key={session.id}
                              speakerForename={session.speakerForename}
                              speakerSurname={session.speakerSurname}
                              title={session.title}
                              status={session.status}
                              rating={session.speakerRating}
                              adminForename={session.adminForename}
                              adminSurname={session.adminSurname}
                              adminImageUri={session.adminImageUri}
                              lastContact={session.lastContact}
                            />
                        </Link>
                    </div>
                )}
            </div>
        );
    }
}

SessionList.propTypes = {
    sessions: PropTypes.array,
};

export default SessionList;
