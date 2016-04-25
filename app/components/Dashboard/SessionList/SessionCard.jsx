import React, { Component, PropTypes } from 'react';
import StarRating from 'react-star-rating';
import SessionStatusService from '../../../services/SessionStatusService';
import moment from 'moment';

import styles from './sessionCard.scss';

class SessionCard extends Component {

    isValidDate(date) {
        return ((new Date(date) !== 'Invalid Date' && !isNaN(new Date(date))));
    }

    joinName(forename, surname) {
        const fn = forename ? `${forename} ` : '';
        const ln = surname || '';
        return `${fn} ${ln}`;
    }

    render() {
        const footerStyle = {
            backgroundColor: SessionStatusService.getStatusColor(this.props.status),
        };

        const speakerLastContact = this.props.speakerLastContact;
        let lastContact = null;
        if (speakerLastContact) {
            const date = this.isValidDate(speakerLastContact)
                ? moment(speakerLastContact).format('DD MMMM YYYY')
                : speakerLastContact;

            lastContact =
            (<div className={styles.lastContact}>
                <p>Last contact -
                    <span className={styles.date}>
                        {` ${date}`}
                    </span>
                </p>
            </div>);
        }

        const speakerName = this.joinName(this.props.speakerForename, this.props.speakerSurname);
        const adminName = this.joinName(this.props.adminForename, this.props.adminSurname);

        return (
            <div className={styles.sessionCard}>
                <div className={styles.body}>
                    <div className={styles.header}>
                        <div className={styles.adminImg}>
                            <img src={this.props.adminImageUri} />
                        </div>
                        <div className={styles.adminName}>
                            {adminName}
                        </div>
                        <div className={styles.notificationImg}>
                            <img src="https://s3-eu-west-1.amazonaws.com/bristech-images/notification-icon-tm2.png" />
                        </div>
                    </div>
                    <div className={styles.rating}>
                        <StarRating
                          name="session-rating"
                          totalStars={5}
                          rating={this.props.rating}
                          disabled
                          size={14}
                        />
                    </div>
                    <div className={styles.title}>
                        {this.props.title}
                    </div>
                </div>
                <div className={styles.footer} style={footerStyle}>
                    <div className={styles.speakerName}>
                        {speakerName}
                    </div>
                    {lastContact}
                </div>
            </div>
        );
    }
}

SessionCard.propTypes = {
    speakerLastContact: PropTypes.string,
    speakerForename: PropTypes.string,
    speakerSurname: PropTypes.string,
    title: PropTypes.string,
    rating: PropTypes.number,
    adminForename: PropTypes.string,
    adminSurname: PropTypes.string,
    adminImageUri: PropTypes.string,
    status: PropTypes.string,
};

export default SessionCard;
