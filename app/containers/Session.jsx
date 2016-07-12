import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SessionSidebar from '../components/Session/SessionSidebar.jsx';
import SessionCorrespondence from '../components/Session/SessionCorrespondence.jsx';
import { getSession, getCorrespondence,
    updateSpeakerRating, updateSpeakerBio,
    changeSpeakerRatingEditMode, changeSpeakerBioEditMode, changeSessionDescriptionEditMode,
    changeSpeakerRatingStash, changeSpeakerBioStash } from '../actions';
import styles from './session.scss';

class Session extends Component {

    constructor(props) {
        super(props);
        this.changeSpeakerRatingStash = this.changeSpeakerRatingStash.bind(this);
        this.changeSpeakerRatingEditMode = this.changeSpeakerRatingEditMode.bind(this);
        this.saveSpeakerRating = this.saveSpeakerRating.bind(this);
        this.changeSpeakerBioEditMode = this.changeSpeakerBioEditMode.bind(this);
        this.changeSpeakerBioStash = this.changeSpeakerBioStash.bind(this);
        this.saveSpeakerBio = this.saveSpeakerBio.bind(this);
        this.changeSessionDescriptionEditMode = this.changeSessionDescriptionEditMode.bind(this);
    }

    componentDidMount() {
        const sessionId = this.props.params.sessionId;
        this.props.dispatch(getSession(sessionId));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.session.id !== nextProps.session.id) {
            this.props.dispatch(getCorrespondence(nextProps.session));
        }
    }

    changeSpeakerRatingEditMode(inEditMode) {
        this.props.dispatch(changeSpeakerRatingEditMode(inEditMode));
    }

    changeSpeakerBioEditMode(inEditMode) {
        this.props.dispatch(changeSpeakerBioEditMode(inEditMode));
    }

    changeSessionDescriptionEditMode(inEditMode) {
        this.props.dispatch(changeSessionDescriptionEditMode(inEditMode));
    }

    changeSpeakerRatingStash(rating) {
        if (this.props.editStash.speakerRating.inEditMode) {
            this.props.dispatch(changeSpeakerRatingStash(rating));
        }
    }

    changeSpeakerBioStash(bio) {
        if (this.props.editStash.speakerBio.inEditMode) {
            this.props.dispatch(changeSpeakerBioStash(bio));
        }
    }

    saveSpeakerRating() {
        const newValue = this.props.editStash.speakerRating.value;
        if (newValue !== null
            && newValue >= 0
            && newValue < 6) {
            this.props.dispatch(
                updateSpeakerRating(this.props.speaker.id, this.props.editStash.speakerRating.value));
        } else {
            this.changeSpeakerRatingEditMode(false);
        }
    }

    saveSpeakerBio() {
        this.props.dispatch(updateSpeakerBio(this.props.speaker.id, this.props.editStash.speakerBio.value));
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
                      speakerId={this.props.speaker ? this.props.speaker.id : null}
                      speakerForename={this.props.speaker ? this.props.speaker.forename : null}
                      speakerSurname={this.props.speaker ? this.props.speaker.surname : null}
                      speakerRating={this.props.speaker ? this.props.speaker.rating : null}
                      speakerBio={this.props.speaker ? this.props.speaker.bio : null}
                      speakerHandles={[]}
                      adminForename={this.props.admin ? this.props.admin.forename : null}
                      adminSurname={this.props.admin ? this.props.admin.surname : null}
                      lastContact={this.props.lastContact}
                      editStash={this.props.editStash}
                      changeSpeakerRatingStash={this.changeSpeakerRatingStash}
                      changeSpeakerRatingEditMode={this.changeSpeakerRatingEditMode}
                      saveSpeakerRating={this.saveSpeakerRating}
                      changeSpeakerBioStash={this.changeSpeakerBioStash}
                      changeSpeakerBioEditMode={this.changeSpeakerBioEditMode}
                      saveSpeakerBio={this.saveSpeakerBio}
                      changeSessionDescriptionEditMode={this.changeSessionDescriptionEditMode}
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
    lastContact: PropTypes.object,
    correspondence: PropTypes.object,
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
        lastContact: state.session.lastContact,
        error: state.session.error,
    };
}

export default connect(mapStateToProps)(Session);
