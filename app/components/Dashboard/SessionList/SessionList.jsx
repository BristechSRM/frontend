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
                              title={session.title}
                              status={session.status}
                              speakerForename={session.speaker.forename}
                              speakerSurname={session.speaker.surname}
                              speakerRating={session.speaker.rating}
                              adminForename={session.admin ? session.admin.forename : null}
                              adminSurname={session.admin ? session.admin.surname : null}
                              adminImageUri={session.admin ? session.admin.imageUri : null}
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
