import React, { Component, PropTypes } from 'react';
import CorrespondenceItem from './CorrespondenceItem.jsx';

import styles from './sessionCorrespondence.scss';

class SessionCorrespondence extends Component {

    render() {
        // TODO: add correspondence id and use it for key value instead of item.message
        return (
            <div className={styles.correspondence}>
                {this.props.correspondence.map(item =>
                    <div key={item.message} className={styles.correspondenceItem}>
                        <CorrespondenceItem
                          message={item.message}
                          date={item.date}
                        />
                    </div>
                )}
            </div>
        );
    }
}

// TODO: create PropTypes.iterable
SessionCorrespondence.propTypes = {
    correspondence: PropTypes.object,
};

export default SessionCorrespondence;
