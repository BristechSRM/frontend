import React, { Component, PropTypes } from 'react';
import EditNote from './EditNote.jsx';
import NewNote from './NewNote.jsx';
import Note from './Note.jsx';

import styles from './sessionNotes.scss';

class SessionNotes extends Component {

    renderNoteDisplayOrEditControl(item) {
        return (
            this.props.noteEditStash.noteId !== item.id ?
                <div
                  key={item.id}
                  className={styles.note}
                  onClick={() => this.props.changeNoteEditMode(item.id, true, item.note)}
                >
                    <Note
                      note={item.note}
                      dateModified={item.dateModified}
                      dateAdded={item.dateAdded}
                    />
                </div>
            :
                <div
                  key={item.id}
                  className={styles.note}
                >
                    <EditNote
                      noteId={item.id}
                      note={this.props.noteEditStash.value}
                      editNote={this.props.handleNoteEdit}
                      saveNoteEdit={this.props.handleNoteEditSave}
                      cancelNoteEdit={() => this.props.changeNoteEditMode(item.id, false)}
                    />
                </div>
        );
    }

    render() {
        return (
            <div>
                <h3> Notes </h3>
                <div className={styles.notes}>
                    {this.props.notes.map(item => this.renderNoteDisplayOrEditControl(item))}
                    <div className={styles.note}>
                        <NewNote
                          newNote={this.props.newNote}
                          changeNewNote={this.props.changeNewNote}
                          isEditingNewNote={this.props.isEditingNewNote}
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
    // Editing current notes
    handleNoteEdit: PropTypes.func.isRequired,
    handleNoteEditSave: PropTypes.func.isRequired,
    changeNoteEditMode: PropTypes.func.isRequired,
    noteEditStash: PropTypes.object.isRequired,

    // Creating new notes
    newNote: PropTypes.string.isRequired,
    changeNewNote: PropTypes.func.isRequired,
    isEditingNewNote: PropTypes.bool.isRequired,
    saveNewNote: PropTypes.func.isRequired,
    clearNewNote: PropTypes.func.isRequired,
};

export default SessionNotes;
