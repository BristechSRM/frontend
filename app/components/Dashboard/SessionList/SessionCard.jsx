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
        const lastContactDate = this.props.lastContact ? this.props.lastContact.date : 'Never';

        const date = this.isValidDate(lastContactDate)
            ? moment(lastContactDate).format('DD MMMM YYYY')
            : lastContactDate;
        let lastContact =
            (<div className={styles.lastContact}>
                <p>Last contact -
                    <span className={styles.date}>
                        {` ${date}`}
                    </span>
                </p>
            </div>);

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
                          rating={this.props.speakerRating}
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
    title: PropTypes.string,
    status: PropTypes.string,
    speakerForename: PropTypes.string,
    speakerSurname: PropTypes.string,
    speakerRating: PropTypes.number,
    adminForename: PropTypes.string,
    adminSurname: PropTypes.string,
    adminImageUri: PropTypes.string,
    lastContact: PropTypes.object,
};

export default SessionCard;
