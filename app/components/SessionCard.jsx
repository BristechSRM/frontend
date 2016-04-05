import React, { Component } from 'react';
import StarRating from 'react-star-rating';

import styles from './sessionCard.scss';

class SessionCard extends Component {

    render() {

        var footerStyle = {
            "backgroundColor": "#373736"
        };

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
                            <img src="https://s3-eu-west-1.amazonaws.com/bristech-images/notification-icon-tm2.png"/>
                        </div>
                    </div>
                    <div className={styles.rating}>
                        <StarRating name="session-rating" totalStars={5} rating={this.props.rating} disabled={true} size={14} />
                    </div>
                    <div className={styles.title}>
                        {this.props.title}
                    </div>
                </div>
                <div className={styles.footer} style={footerStyle}>
                    <div className={styles.speakerName}>
                        {this.props.speakerName}
                    </div>
                    <div className={styles.lastContacted}>
                        Last contacted - <span className={styles.date}>{this.props.speakerLastContacted || "Unknown"}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default SessionCard;
