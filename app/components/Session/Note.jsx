import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import styles from './note.scss';

class Note extends Component {

    render() {
        const dateModified = moment(this.props.dateModified);

        return (
            <div className={styles.note}>
                <div className={styles.content}>
                    {this.props.note.split('\n').map((paragraph, index) =>
                        <p key={index}>{paragraph}</p>
                    )}
                </div>
                <div className={styles.details}>
                    <div>Date Modified:</div>
                    <div>{dateModified.format('DD MMMM YYYY [at] h:mma')}</div>
                </div>
            </div>
        );
    }
}

Note.propTypes = {
    dateModified: PropTypes.string,
    note: PropTypes.string,
};

export default Note;
