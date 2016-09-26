import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewSpeakerForm from '../components/Speaker/NewSpeakerForm.jsx';
import {
    newSpeakerForenameChanged,
    newSpeakerSurnameChanged,
    newSpeakerImageUriChanged,
    newSpeakerBioChanged,
    newSpeakerSetNewSessionNext,
    submitNewSpeaker,
} from '../actions';


// React container component for creating a new Speaker.
// Acts as a container for the display-only NewSpeakerForm component.
class NewSpeaker extends Component {

    constructor(props) {
        super(props);
        this.forenameChanged = this.forenameChanged.bind(this);
        this.surnameChanged = this.surnameChanged.bind(this);
        this.imageUriChanged = this.imageUriChanged.bind(this);
        this.bioChanged = this.bioChanged.bind(this);
        this.createSessionNextChanged = this.createSessionNextChanged.bind(this);
        this.submit = this.submit.bind(this);
    }

    forenameChanged(forename) {
        this.props.dispatch(newSpeakerForenameChanged(forename));
    }

    surnameChanged(surname) {
        this.props.dispatch(newSpeakerSurnameChanged(surname));
    }

    imageUriChanged(imageUri) {
        this.props.dispatch(newSpeakerImageUriChanged(imageUri));
    }

    bioChanged(bio) {
        this.props.dispatch(newSpeakerBioChanged(bio));
    }

    createSessionNextChanged(value) {
        window.checkedValue = value;
        this.props.dispatch(newSpeakerSetNewSessionNext(value));
    }
    submit() {
        this.props.dispatch(submitNewSpeaker(this.context.router));
    }

    render() {
        return (
            <div>
                <h1>Create New Speaker</h1>
                <NewSpeakerForm
                  forename={this.props.forename}
                  forenameValidationMessage={this.props.forenameValidationMessage}
                  surname={this.props.surname}
                  surnameValidationMessage={this.props.surnameValidationMessage}
                  imageUri={this.props.imageUri}
                  bio={this.props.bio}
                  createSessionNextSelected={this.props.createSessionNext}
                  error={this.props.error}
                  submitMessage={this.props.submitMessage}
                  submit={this.submit}
                  createSessionNextChanged={this.createSessionNextChanged}
                  forenameChanged={this.forenameChanged}
                  surnameChanged={this.surnameChanged}
                  imageUriChanged={this.imageUriChanged}
                  bioChanged={this.bioChanged}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        submitMessage: state.newspeaker.submitMessage,
        forename: state.newspeaker.forename,
        forenameValidationMessage: state.newspeaker.forenameValidationMessage,
        surname: state.newspeaker.surname,
        surnameValidationMessage: state.newspeaker.surnameValidationMessage,
        imageUri: state.newspeaker.imageUri,
        bio: state.newspeaker.bio,
        createSessionNext: state.newspeaker.createSessionNext,
        error: state.newspeaker.error,
    };
}

NewSpeaker.contextTypes = {
    router: PropTypes.object,
};


NewSpeaker.propTypes = {
    forename: PropTypes.string,
    forenameValidationMessage: PropTypes.string,
    surname: PropTypes.string,
    surnameValidationMessage: PropTypes.string,
    imageUri: PropTypes.string,
    imageUriValidationMessage: PropTypes.string,
    bio: PropTypes.string,
    createSessionNext: PropTypes.bool,
    error: PropTypes.string,
    submitMessage: PropTypes.string,
    submit: PropTypes.func,
    dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(NewSpeaker);
