import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import SessionCard from './SessionCard.jsx';
import _ from 'lodash';
import styles from './sessionList.scss';

class SessionList extends Component {

    render() {
        return (
            <div className={styles.sessionList}>
                {this.props.sessions.valueSeq().map(session =>
                    <div className={styles.sessionCard}>
                        <Link to={'/session/' + session.id}>
                            <SessionCard
                                key={session.id}
                                speakerName={session.speakerName}
                                title={session.title}
                                rating={session.speakerRating}
                                adminName={session.adminName}
                                adminImageUri={session.adminImageUrl} />
                        </Link>
                    </div>
                )}
            </div>
        )
    }
}

export default SessionList;
