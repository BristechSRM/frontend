import React, { Component } from 'react';
import moment from 'moment';
import styles from './CorrespondenceItem.scss';

class CorrespondenceItem extends Component {

    render() {
        var date = moment(this.props.date);

        return (
            <div className={styles.correspondenceItem}>
                <div className={styles.content}>
                    {this.props.message.split("\n").map(paragraph =>
                        <p>{paragraph}</p>
                    )}
                </div>
                <div className={styles.details}>
                    {date.format("DD MMMM YYYY [at] h:mma")}
                </div>
            </div>
        );
    }
}

export default CorrespondenceItem;
