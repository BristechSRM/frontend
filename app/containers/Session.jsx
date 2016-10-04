import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SessionSidebar from '../components/Session/SessionSidebar.jsx';
import SessionNotes from '../components/Session/SessionNotes.jsx';
import { getSession, getNotesBySessionId, getAllEvents,
    updateSpeakerBio, updateSpeakerForename, updateSpeakerSurname,
    updateSessionDescription, updateSessionTitle, updateSessionEventId,
    changeNoteEditMode, changeNoteStash, updateNote,
    changeNewNote, clearNewNote, saveNewNote,
    changeSessionViewEditMode,
    changeSessionViewEditStash } from '../actions';
import styles from './session.scss';

class Session extends Component {

    constructor(props) {
        super(props);
        this.changeEditMode = this.changeEditMode.bind(this);
        this.changeEditStash = this.changeEditStash.bind(this);
        this.saveStashedChanges = this.saveStashedChanges.bind(this);
        this.saveSpeakerBio = () => this.saveStashedChanges('speaker', 'bio', updateSpeakerBio);
        this.saveSessionDescription = () => this.saveStashedChanges('session', 'description', updateSessionDescription);
        this.saveSessionTitle = () => this.saveStashedChanges('session', 'title', updateSessionTitle);
        this.saveSessionEventId = () => this.saveStashedChanges('session', 'eventId', updateSessionEventId);
        this.saveSpeakerNames = () => {
            this.saveStashedChanges('speaker', 'forename', updateSpeakerForename);
            this.saveStashedChanges('speaker', 'surname', updateSpeakerSurname);
        };

        this.handleNoteEditSave = this.handleNoteEditSave.bind(this);
        this.handleNoteEdit = this.handleNoteEdit.bind(this);
        this.changeNoteEditMode = this.changeNoteEditMode.bind(this);

        this.changeNewNote = this.changeNewNote.bind(this);
        this.clearNewNote = this.clearNewNote.bind(this);
        this.saveNewNote = this.saveNewNote.bind(this);
    }

    componentDidMount() {
        const sessionId = this.props.params.sessionId;
        this.props.dispatch(getSession(sessionId));
        this.props.dispatch(getAllEvents());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.session.id !== nextProps.session.id) {
            this.props.dispatch(getNotesBySessionId(nextProps.session.id));
        }
    }

    changeEditMode(record, field, inEditMode) {
        this.props.dispatch(changeSessionViewEditMode(record, field, inEditMode));
    }

    changeEditStash(record, field, value) {
        if (!this.props.editStash[record][field].inEditMode) {
            // TODO: decide if this should be set here, or in reducer as a part of changing stash
            this.changeEditMode(record, field, true);
        }
        this.props.dispatch(changeSessionViewEditStash(record, field, value));
    }

    saveStashedChanges(record, field, updateFunc) {
        if (this.props.editStash[record][field].valueChanged) {
            this.props.dispatch(updateFunc(this.props[record].id, this.props.editStash[record][field].value));
        } else {
            this.changeEditMode(record, field, false);
        }
    }

    changeNoteEditMode(noteId, inEditMode, currentNote) {
        this.props.dispatch(changeNoteEditMode(noteId, inEditMode, currentNote));
    }

    handleNoteEdit(editedNote) {
        this.props.dispatch(changeNoteStash(editedNote));
    }

    handleNoteEditSave() {
        this.props.dispatch(updateNote(
            this.props.session.id,
            this.props.noteEditStash.noteId,
            this.props.noteEditStash.value));
    }

    changeNewNote(note) {
        this.props.dispatch(changeNewNote(note));
    }

    clearNewNote() {
        this.props.dispatch(clearNewNote());
    }

    saveNewNote() {
        this.props.dispatch(saveNewNote(this.props.session.id, this.props.newNote));
    }

    render() {
        if (this.props.isFetching) {
            return (
                <p>Loading...</p>
            );
        }
        return (
            <div className={styles.session}>
                <div className={styles.sidebar}>
                    <SessionSidebar
                      title={this.props.session.title}
                      status={this.props.session.status}
                      description={this.props.session.description}
                      date={this.props.session.date}
                      dateAdded={this.props.session.dateAdded}
                      speakerId={this.props.speaker ? this.props.speaker.id : null}
                      speakerForename={this.props.speaker ? this.props.speaker.forename : null}
                      speakerSurname={this.props.speaker ? this.props.speaker.surname : null}
                      speakerBio={this.props.speaker ? this.props.speaker.bio : null}
                      speakerHandles={this.props.speaker ? this.props.speaker.handles : null}
                      adminForename={this.props.admin ? this.props.admin.forename : null}
                      adminSurname={this.props.admin ? this.props.admin.surname : null}
                      event={this.props.event}
                      allEvents={this.props.events}
                      isFetchingEvents={this.props.isFetchingEvents}
                      editStash={this.props.editStash}
                      changeEditMode={this.changeEditMode}
                      changeEditStash={this.changeEditStash}
                      saveSpeakerBio={this.saveSpeakerBio}
                      saveSessionDescription={this.saveSessionDescription}
                      saveSessionTitle={this.saveSessionTitle}
                      saveSessionEventId={this.saveSessionEventId}
                      saveSpeakerNames={this.saveSpeakerNames}
                    />
                </div>
                <div className={styles.notes}>
                    <SessionNotes
                      notes={this.props.notes}

                      handleNoteEdit={this.handleNoteEdit}
                      handleNoteEditSave={this.handleNoteEditSave}
                      changeNoteEditMode={this.changeNoteEditMode}
                      noteEditStash={this.props.noteEditStash}

                      newNote={this.props.newNote}
                      changeNewNote={this.changeNewNote}
                      isEditingNewNote={this.props.isEditingNewNote}
                      saveNewNote={this.saveNewNote}
                      clearNewNote={this.clearNewNote}
                    />
                </div>
            </div>
        );
    }
}

Session.propTypes = {
    params: PropTypes.object,
    session: PropTypes.object,
    speaker: PropTypes.object,
    admin: PropTypes.object,
    event: PropTypes.object,
    notes: PropTypes.object,
    noteEditStash: PropTypes.object,
    newNote: PropTypes.string,
    isEditingNewNote: PropTypes.bool,
    events: PropTypes.object,
    isFetchingEvents: PropTypes.bool,
    isFetching: PropTypes.bool,
    editStash: PropTypes.object,
    error: PropTypes.shape({ message: PropTypes.string }),
    dispatch: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        isFetching: state.session.isFetching,
        editStash: state.session.editStash,
        notes: state.session.notes,
        noteEditStash: state.session.noteEditStash,
        newNote: state.session.newNote,
        isEditingNewNote: state.session.isEditingNewNote,
        session: state.session.session,
        speaker: state.session.session.speaker,
        admin: state.session.session.admin,
        event: state.session.session.event,
        events: state.session.events,
        isFetchingEvents: state.session.isFetchingEvents,
        error: state.session.error,
    };
}

export default connect(mapStateToProps)(Session);
