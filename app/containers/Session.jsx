import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SessionSidebar from '../components/Session/SessionSidebar.jsx';
import SessionCorrespondence from '../components/Session/SessionCorrespondence.jsx';
import { getSession, getCorrespondence, getAllEvents,
    updateSpeakerRating, updateSpeakerBio, updateSpeakerForename, updateSpeakerSurname,
    updateSessionDescription, updateSessionTitle, updateSessionEventId,
    changeSessionViewEditMode,
    changeSessionViewEditStash } from '../actions';
import styles from './session.scss';

class Session extends Component {

    constructor(props) {
        super(props);
        this.changeEditMode = this.changeEditMode.bind(this);
        this.changeEditStash = this.changeEditStash.bind(this);
        this.saveStashedChanges = this.saveStashedChanges.bind(this);
        this.saveSpeakerRating = () => this.saveStashedChanges('speaker', 'rating', updateSpeakerRating);
        this.saveSpeakerBio = () => this.saveStashedChanges('speaker', 'bio', updateSpeakerBio);
        this.saveSessionDescription = () => this.saveStashedChanges('session', 'description', updateSessionDescription);
        this.saveSessionTitle = () => this.saveStashedChanges('session', 'title', updateSessionTitle);
        this.saveSessionEventId = () => this.saveStashedChanges('session', 'eventId', updateSessionEventId);
        this.saveSpeakerNames = () => {
            this.saveStashedChanges('speaker', 'forename', updateSpeakerForename);
            this.saveStashedChanges('speaker', 'surname', updateSpeakerSurname);
        };
    }

    componentDidMount() {
        const sessionId = this.props.params.sessionId;
        this.props.dispatch(getSession(sessionId));
        this.props.dispatch(getAllEvents()); // TODO change to a function to be called when edit mode is entered.
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.session.id !== nextProps.session.id) {
            this.props.dispatch(getCorrespondence(nextProps.session));
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
                      speakerRating={this.props.speaker ? this.props.speaker.rating : null}
                      speakerBio={this.props.speaker ? this.props.speaker.bio : null}
                      speakerHandles={this.props.speaker ? this.props.speaker.handles : null}
                      adminForename={this.props.admin ? this.props.admin.forename : null}
                      adminSurname={this.props.admin ? this.props.admin.surname : null}
                      event={this.props.event}
                      lastContact={this.props.session.lastContact}
                      allEvents={this.props.events}
                      isFetchingEvents={this.props.isFetchingEvents}
                      editStash={this.props.editStash}
                      changeEditMode={this.changeEditMode}
                      changeEditStash={this.changeEditStash}
                      saveSpeakerRating={this.saveSpeakerRating}
                      saveSpeakerBio={this.saveSpeakerBio}
                      saveSessionDescription={this.saveSessionDescription}
                      saveSessionTitle={this.saveSessionTitle}
                      saveSessionEventId={this.saveSessionEventId}
                      saveSpeakerNames={this.saveSpeakerNames}
                    />
                </div>
                <div className={styles.correspondence}>
                    <SessionCorrespondence correspondence={this.props.correspondence} />
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
    correspondence: PropTypes.object,
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
        correspondence: state.session.correspondence,
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
