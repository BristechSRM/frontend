import React, { Component, PropTypes } from 'react';
import Note from './Note.jsx';

import styles from './sessionNotes.scss';

class SessionNotes extends Component {

    render() {
        return (
            <div>
                <h3> Notes </h3>
                <div className={styles.notes}>
                    {this.props.notes.map(item =>
                        <div key={item.id} className={styles.note}>
                            <Note
                              note={item.note}
                              dateModified={item.dateModified}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

SessionNotes.propTypes = {
    notes: PropTypes.object,
};

export default SessionNotes;
