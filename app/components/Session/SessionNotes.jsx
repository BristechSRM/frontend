import React, { Component, PropTypes } from 'react';
import NewNote from './NewNote.jsx';
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
                    <div className={styles.note}>
                        <NewNote
                          newNote={this.props.newNote}
                          editNewNote={this.props.editNewNote}
                          editingNewNote={this.props.editingNewNote}
                          saveNewNote={this.props.saveNewNote}
                          clearNewNote={this.props.clearNewNote}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

SessionNotes.propTypes = {
    notes: PropTypes.object,
    newNote: PropTypes.string.isRequired,
    editNewNote: PropTypes.func.isRequired,
    editingNewNote: PropTypes.bool.isRequired,
    saveNewNote: PropTypes.func.isRequired,
    clearNewNote: PropTypes.func.isRequired,
};

export default SessionNotes;
