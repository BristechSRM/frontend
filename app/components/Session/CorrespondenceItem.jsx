import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import styles from './correspondenceItem.scss';

class CorrespondenceItem extends Component {

    render() {
        const date = moment(this.props.date);

        return (
            <div className={styles.correspondenceItem}>
                <div className={styles.content}>
                    {this.props.message.split('\n').map((paragraph, index) =>
                        <p key={index}>{paragraph}</p>
                    )}
                </div>
                <div className={styles.details}>
                    {date.format('DD MMMM YYYY [at] h:mma')}
                </div>
            </div>
        );
    }
}

CorrespondenceItem.propTypes = {
    date: PropTypes.string,
    message: PropTypes.string,
};

export default CorrespondenceItem;