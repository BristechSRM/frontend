import React, { Component, PropTypes } from 'react';
import StarRating from 'react-star-rating';
import SessionStatusService from '../../../services/SessionStatusService';
import moment from 'moment';

import styles from './sessionCard.scss';

class SessionCard extends Component {

    render() {
        const footerStyle = {
            backgroundColor: SessionStatusService.getStatusColor(this.props.status),
        };

        const speakerLastContact = this.props.speakerLastContact;
        let lastContact = null;
        if (speakerLastContact) {
            const momentDate = moment(speakerLastContact);
            const date = momentDate.isValid()
                ? momentDate.format('DD MMMM YYYY')
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

        return (
            <div className={styles.sessionCard}>
                <div className={styles.body}>
                    <div className={styles.header}>
                        <div className={styles.adminImg}>
                            <img src={this.props.adminImageUri} />
                        </div>
                        <div className={styles.adminName}>
                            {this.props.adminName}
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
                        {this.props.speakerName}
                    </div>
                    {lastContact}
                </div>
            </div>
        );
    }
}

SessionCard.propTypes = {
    speakerLastContact: PropTypes.string,
    speakerName: PropTypes.string,
    title: PropTypes.string,
    rating: PropTypes.number,
    adminName: PropTypes.string,
    adminImageUri: PropTypes.string,
    status: PropTypes.string,
};

export default SessionCard;