import React, { Component, PropTypes } from 'react';
import CorrespondenceItem from './CorrespondenceItem.jsx';

import styles from './sessionCorrespondence.scss';

class SessionCorrespondence extends Component {

    render() {
        const sortedCorrespondence = this.props.correspondence.sort((a, b) => a.date < b.date);
        return (
            <div className={styles.correspondence}>
                {sortedCorrespondence.map(correspondenceItem =>
                    <div className={styles.correspondenceItem}>
                        <CorrespondenceItem
                          message={correspondenceItem.message}
                          date={correspondenceItem.date}
                        />
                    </div>
                )}
            </div>
        );
    }
}

SessionCorrespondence.propTypes = {
    correspondence: PropTypes.array,
};

export default SessionCorrespondence;
