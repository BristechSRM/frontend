import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewSessionForm from '../components/Session/NewSessionForm.jsx';
import {
    newSessionTitleEntered,
    newSessionDescriptionEntered,
    newSessionDateEntered,
    newSessionSpeakerSelected,
    newSessionAdminSelected,
    getAllSpeakers,
    getAllAdmins,
    submitNewSession,
} from '../actions';


// React container component for creating a new session.
// Acts as a container for the display-only NewSessionForm component.
class NewSession extends Component {

    constructor(props) {
        super(props);
        this.titleEntered = this.titleEntered.bind(this);
        this.descriptionEntered = this.descriptionEntered.bind(this);
        this.dateEntered = this.dateEntered.bind(this);
        this.speakerSelected = this.speakerSelected.bind(this);
        this.adminSelected = this.adminSelected.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getAllSpeakers());
        this.props.dispatch(getAllAdmins());
    }


    titleEntered(title) {
        this.props.dispatch(newSessionTitleEntered(title));
    }

    descriptionEntered(description) {
        this.props.dispatch(newSessionDescriptionEntered(description));
    }

    dateEntered(date) {
        this.props.dispatch(newSessionDateEntered(date));
    }

    speakerSelected(speakerId) {
        this.props.dispatch(newSessionSpeakerSelected(speakerId));
    }

    adminSelected(adminId) {
        this.props.dispatch(newSessionAdminSelected(adminId));
    }

    submit() {
        this.props.dispatch(submitNewSession(this.context.router));
    }

    render() {
        return (
            <div>
                <h1>Create New Session</h1>
                <NewSessionForm
                  title={this.props.title}
                  titleValidationMessage={this.props.titleValidationMessage}
                  description={this.props.description}
                  descriptionValidationMessage={this.props.descriptionValidationMessage}
                  date={this.props.date}
                  dateValidationMessage={this.props.dateValidationMessage}
                  speakerId={this.props.speakerId}
                  speakerIdValidationMessage={this.props.speakerIdValidationMessage}
                  adminId={this.props.adminId}
                  adminIdValidationMessage={this.props.adminIdValidationMessage}
                  error={this.props.error}
                  admins={this.props.admins}
                  speakers={this.props.speakers}
                  isFetchingAdmins={this.props.isFetchingAdmins}
                  isFetchingSpeakers={this.props.isFetchingSpeakers}
                  submitMessage={this.props.submitMessage}
                  submit={this.submit}
                  titleEntered={this.titleEntered}
                  descriptionEntered={this.descriptionEntered}
                  dateEntered={this.dateEntered}
                  speakerSelected={this.speakerSelected}
                  adminSelected={this.adminSelected}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        admins: state.newsession.admins,
        speakers: state.newsession.speakers,
        isFetchingAdmins: state.newsession.isFetchingAdmins,
        isFetchingSpeakers: state.newsession.isFetchingSpeakers,
        submitMessage: state.newsession.submitMessage,
        title: state.newsession.title,
        titleValidationMessage: state.newsession.titleValidationMessage,
        description: state.newsession.description,
        descriptionValidationMessage: state.newsession.descriptionValidationMessage,
        date: state.newsession.date,
        dateValidationMessage: state.newsession.dateValidationMessage,
        speakerId: state.newsession.speakerId,
        speakerIdValidationMessage: state.newsession.speakerIdValidationMessage,
        adminId: state.newsession.adminId,
        adminIdValidationMessage: state.newsession.adminIdValidationMessage,
        error: state.newsession.error,
    };
}

NewSession.contextTypes = {
    router: PropTypes.object.isRequired,
};


NewSession.propTypes = {
    title: PropTypes.string,
    titleValidationMessage: PropTypes.string,
    description: PropTypes.string,
    descriptionValidationMessage: PropTypes.string,
    date: PropTypes.string,
    dateValidationMessage: PropTypes.string,
    speakerId: PropTypes.string,
    speakerIdValidationMessage: PropTypes.string,
    adminId: PropTypes.string,
    adminIdValidationMessage: PropTypes.string,
    error: PropTypes.string,
    isFetchingAdmins: PropTypes.bool,
    isFetchingSpeakers: PropTypes.bool,
    submitMessage: PropTypes.string,
    submit: PropTypes.func,
    titleEntered: PropTypes.func,
    descriptionEntered: PropTypes.func,
    dateEntered: PropTypes.func,
    speakerSelected: PropTypes.func,
    adminSelected: PropTypes.func,
    dispatch: PropTypes.func,
    admins: PropTypes.array,
    speakers: PropTypes.array,
};

export default connect(mapStateToProps)(NewSession);
