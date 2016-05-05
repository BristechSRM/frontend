import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/lib/font-icon';
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

        const speakerName = this.joinName(this.props.speakerForename, this.props.speakerSurname);
        const adminName = this.joinName(this.props.adminForename, this.props.adminSurname);

        return (
            <div className={styles.sessionCard}>
                <div className={styles.speakerImage}>
                    <img src="https://placebear.com/g/50/50" />
                </div>
                <div className={styles.speakerDetails} style={footerStyle}>
                    <div className={styles.speakerName}>
                        {speakerName}
                    </div>
                    <div className={styles.speakerRating}>
                        {'★'.repeat(this.props.speakerRating)}
                        {'☆'.repeat(5 - this.props.speakerRating)}
                    </div>
                </div>
                <div className={styles.sessionDetails}>
                    <div className={styles.sessionTitle}>
                        <div className={styles.eventDate}>
                             <FontIcon className={`material-icons ${styles.clock}`}>schedule</FontIcon>
                             3rd February 2016
                        </div>
                        {this.props.title}
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.admin}>
                            <div className={styles.adminImage}>
                                <img src={this.props.adminImageUri} />
                            </div>
                            <div>
                                <span className={styles.lighter}>Assigned to</span><br />
                                {adminName}
                            </div>
                        </div>
                        <div className={styles.lastContact}>
                            <span className={styles.lighter}>Last contacted</span><br />
                            {date}
                        </div>
                    </div>
                </div>
            </div>
            // <div className={styles.sessionCard}>
            //     <div className={styles.body}>
            //         <div className={styles.header}>
            //             <div className={styles.adminImg}>
            //                 <img src={this.props.adminImageUri} />
            //             </div>
            //             <div className={styles.adminName}>
            //                 {adminName}
            //             </div>
            //             <div className={styles.notificationImg}>
            //                 <img src="https://s3-eu-west-1.amazonaws.com/bristech-images/notification-icon-tm2.png" />
            //             </div>
            //         </div>
            //         <div className={styles.rating}>
            //             <StarRating
            //               name="session-rating"
            //               totalStars={5}
            //               rating={this.props.speakerRating}
            //               disabled
            //               size={14}
            //             />
            //         </div>
            //         <div className={styles.title}>
            //             {this.props.title}
            //         </div>
            //     </div>
            //     <div className={styles.footer} style={footerStyle}>
            //         <div className={styles.speakerName}>
            //             {speakerName}
            //         </div>
            //         {lastContact}
            //     </div>
            // </div>
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
